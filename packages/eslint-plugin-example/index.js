const i18nLiteral = require('./rules/i18nLiteral');
const banImport = require('./rules/banImport');

exports.rules = {
  'i18n-literal': i18nLiteral,
  'ban-import': banImport
};
