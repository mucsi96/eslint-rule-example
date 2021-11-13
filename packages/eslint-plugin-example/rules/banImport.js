exports.create = (context) => ({
  ImportDeclaration(node) {
    if (node.source.type === 'Literal' && node.source.value === 'fs') {
      context.report(
        node,
        `importing from fs is not allowed from ${context.getFilename()}`
      );
    }
  },
});
