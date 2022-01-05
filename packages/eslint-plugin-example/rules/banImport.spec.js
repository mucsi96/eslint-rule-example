const { RuleTester } = require('eslint');
const banImport = require('./banImport');
const parser = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser,
});

ruleTester.run('ban-import', banImport, {
  valid: [{ code: "import { t } from './i18n';" }],
  invalid: [
    {
      filename: 'banImport.js',
      code: "import 'fs';",
      errors: ['importing from fs is not allowed from banImport.js'],
    },
    {
      filename: 'banImport.js',
      code: "import { readFile } from 'fs';",
      errors: ['importing from fs is not allowed from banImport.js'],
    },
  ],
});
