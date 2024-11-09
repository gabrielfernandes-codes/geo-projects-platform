module.exports = {
  ...require('@platform/formatters/prettier.config'),
  overrides: [
    {
      files: 'src/schemas/*.ts',
      options: {
        printWidth: 1000,
      },
    },
  ],
}
