const { RuleTester } = require('eslint');
const noUndefCSSModuleClass = require('./noUndefCSSModuleClass');
const parser = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser,
});

ruleTester.run('no-undef-css-module-class', noUndefCSSModuleClass, {
  valid: [
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.container);",
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; const name = 'test'; console.log(styles[name]);",
    },
    {
      filename: __filename,
      code: "import styles from './test.css'; console.log(styles.notExisting);",
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.b);",
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.c);",
    },
  ],
  invalid: [
    {
      filename: __filename,
      code: "import styles from './notExisting.module.css'; console.log(styles.container);",
      errors: ['CSS Module "./notExisting.module.css" doesn\'t exist'],
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.notExisting);",
      errors: ['CSS Module class "notExisting" doesn\'t exist in styles'],
    },
    {
      filename: __filename,
      code: "import styles from './test.module.css'; console.log(styles.a);",
      errors: ['CSS Module class "a" doesn\'t exist in styles'],
    },
  ],
});
