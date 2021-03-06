const i18nLiteral = require('./rules/i18nLiteral');
const banImport = require('./rules/banImport');
const noUndefCSSModuleClass = require('./rules/noUndefCSSModuleClass');
const noUnusedCSSModuleClass = require('./rules/noUnusedCSSModuleClass');
const onlyPackageEntryPointImport = require('./rules/onlyPackageEntryPointImport');

exports.rules = {
  'i18n-literal': i18nLiteral,
  'ban-import': banImport,
  'no-undef-css-module-class': noUndefCSSModuleClass,
  'no-unused-css-module-class': noUnusedCSSModuleClass,
  'only-package-entry-point-import': onlyPackageEntryPointImport
};
