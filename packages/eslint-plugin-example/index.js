const i18nLiteral = require('./rules/i18nLiteral');
const banImport = require('./rules/banImport');
const noUndefClass = require('./rules/noUndefClass');

exports.rules = {
  'i18n-literal': i18nLiteral,
  'ban-import': banImport,
  'no-undef-class': noUndefClass
};
