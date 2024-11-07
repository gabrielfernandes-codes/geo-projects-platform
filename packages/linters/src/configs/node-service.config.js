const { resolve } = require('node:path')

const eslintConfigPrettier = require('eslint-config-prettier')

const projectRootDir = process.cwd()

const project = resolve(projectRootDir, 'tsconfig.json')

module.exports = {
  ...eslintConfigPrettier,
  languageOptions: {
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: projectRootDir,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
  },
  ignores: ['node_modules', 'dist'],
}
