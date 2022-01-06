const { readFileSync } = require('fs');
const { resolve, dirname } = require('path');

function getCSSModuleClassNames(path) {
    const module = readFileSync(path, 'utf8');
    return module.match(/(?<!:global([^(][^},]*)|[(][^},)]*)(?<=\.)[_A-Za-z0-9\-]+(?=[^}]+{)/g);
  }
  
  function getCSSModuleImportDetails(context, node) {
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
    const fileName = resolve(dirname(context.getFilename()), node.source.value);
    try {
      const classNames = getCSSModuleClassNames(fileName);
  
      if (identifierName) {
        return { identifierName, classNames };
      }
    } catch (error) {
      context.report(node, `CSS Module "${node.source.value}" doesn't exist`);
    }
  }

  module.exports ={
    getCSSModuleImportDetails
  }