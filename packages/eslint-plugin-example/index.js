const i18nLiteral = require('./rules/i18nLiteral');
const banImport = require('./rules/banImport');
const noUndefCSSModuleClass = require('./rules/noUndefCSSModuleClass');

exports.rules = {
  'i18n-literal': i18nLiteral,
  'ban-import': banImport,
  'no-undef-css-module-class': noUndefCSSModuleClass
};
