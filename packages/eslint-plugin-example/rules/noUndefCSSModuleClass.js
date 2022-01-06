const { readFileSync } = require('fs');
const { resolve, dirname } = require('path');

function getCSSModuleClassNames(path) {
  const module = readFileSync(path, 'utf8');
  return module.match(/(?<=\.)[_A-Za-z0-9\-]+(?=[^}]+{)/g);
}

exports.create = (context) => {
  const modules = [];

  return {
    ImportDeclaration(node) {
      if (
        node.source.type !== 'Literal' ||
        !node.source.value.endsWith('.module.css')
      ) {
        return;
      }

      const defaultSpecifier = node.specifiers.find(
        ({ type }) => type === 'ImportDefaultSpecifier'
      );

      if (!defaultSpecifier) {
        return;
      }

      const { name: identifierName } = defaultSpecifier.local;
      const fileName = resolve(
        dirname(context.getFilename()),
        node.source.value
      );
      try {
        const classNames = getCSSModuleClassNames(fileName);

        if (identifierName) {
          modules.push({ identifierName, classNames });
        }
      } catch (error) {
        context.report(node, `CSS Module "${node.source.value}" doesn't exist`);
      }
    },
    MemberExpression(node) {
      if (node.object.type !== 'Identifier' || node.property.type !== 'Identifier' || node.computed) {
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
