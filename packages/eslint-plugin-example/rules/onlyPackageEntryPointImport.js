const validSourceRegex = /^[^\/]+$|^@[^\/]+\/[^\/]+$|^\./;

exports.create = (context) => ({
  ImportDeclaration(node) {
    if (
      node.source.type === 'Literal' &&
      !validSourceRegex.test(node.source.value)
    ) {
      context.report(node, 'Only entry-point import is allowed for packages.');
    }
  },
});
