const { RuleTester } = require('eslint');
const noUnusedCSSModuleClass = require('./noUnusedCSSModuleClass');
const parser = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser,
});

ruleTester.run('no-unused-css-module-class', noUnusedCSSModuleClass, {
  valid: [
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.container, styles.b, styles.c);",
    },
    {
      filename: __filename,
      code: "import styles from './test.css';",
    },
  ],
  invalid: [
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.container, styles.b);",
      errors: ['CSS Module class "c" is not used'],
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.container, styles.c);",
      errors: ['CSS Module class "b" is not used'],
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.b, styles.c);",
      errors: ['CSS Module class "container" is not used'],
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; const name = 'test'; console.log(styles[name]);",
      errors: [
        'CSS Module class "container" is not used',
        'CSS Module class "b" is not used',
        'CSS Module class "c" is not used',
      ],
    },
  ],
});
