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

      if (!cssModule) {
        return;
      }

      cssModule.classNames = cssModule.classNames.filter(
        (className) => className !== node.property.name
      );
    },
    'Program:exit'() {
      modules.forEach((module) => {
        module.classNames.forEach((className) => {
          context.report(
            module.node,
            `CSS Module class "${className}" is not used`
          );
        });
      });
    },
  };
};
