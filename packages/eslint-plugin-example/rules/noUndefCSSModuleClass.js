const { getCSSModuleImportDetails } = require('../utils/cssModuleUtils');

exports.create = (context) => {
  const modules = [];

  return {
    ImportDeclaration(node) {
      const cssModuleImport = getCSSModuleImportDetails(context, node);

      if (cssModuleImport) {
        modules.push(cssModuleImport);
      }
    },
    MemberExpression(node) {
      if (
        node.object.type !== 'Identifier' ||
        node.property.type !== 'Identifier' ||
        node.computed
      ) {
        return;
      }

      const cssModule = modules.find(
        ({ identifierName }) => identifierName === node.object.name
      );

      if (!cssModule || cssModule.classNames.includes(node.property.name)) {
        return;
      }

      context.report(
        node,
        `CSS Module class "${node.property.name}" doesn't exist in ${node.object.name}`
      );
    },
  };
};
