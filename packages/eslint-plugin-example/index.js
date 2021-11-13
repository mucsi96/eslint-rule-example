exports.rules = {
  'i18n-literal': {
    create: function (context) {
      const { report } = context;

      return {
        CallExpression(node) {
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 't' &&
            node.arguments.length &&
            node.arguments[0].type !== 'Literal'
          ) {
            report(node, 't function should be called with literal');
          }
        },
      };
    },
  },
};
