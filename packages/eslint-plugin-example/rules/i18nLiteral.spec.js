const { RuleTester } = require('eslint');
const i18nLiteral = require('./i18nLiteral');
const parser = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser,
});

ruleTester.run('i18n-literal', i18nLiteral, {
  valid: [{ code: "console.log(t('hello'));" }],
  invalid: [
    {
      code: 'console.log(t(`hello`));',
      errors: ['t function should be called with literal'],
    },
    {
      code: "const a = 'hello'; console.log(t(a));",
      errors: ['t function should be called with literal'],
    },
  ],
});
