const { RuleTester } = require('eslint');
const noUndefClass = require('./noUndefClass');
const parser = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser,
});

ruleTester.run('no-undef-class', noUndefClass, {
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
    }
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
  ],
});
