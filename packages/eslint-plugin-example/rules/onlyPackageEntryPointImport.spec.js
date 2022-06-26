const { RuleTester } = require('eslint');
const onlyPackageEntryPointImport = require('./onlyPackageEntryPointImport');
const parser = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser,
});

ruleTester.run('only-package-entry-point-import', onlyPackageEntryPointImport, {
  valid: [
    { code: "import a from '.';" },
    { code: "import a from '..';" },
    { code: "import a from './a';" },
    { code: "import a from '../a';" },
    { code: "import a from './a/b';" },
    { code: "import a from '../a/b';" },
    { code: "import a from 'a';" },
    { code: "import a from '@scope/a';" },
  ],
  invalid: [
    {
      code: "import a from 'a/dist';",
      errors: ['Only entry-point import is allowed for packages.'],
    },
    {
      code: "import a from '@scope/a/dist';",
      errors: ['Only entry-point import is allowed for packages.'],
    },
  ],
});
