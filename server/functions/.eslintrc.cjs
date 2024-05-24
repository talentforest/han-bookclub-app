import path from 'path';

const rootPath = path.resolve(__dirname, 'server/functions');

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projects: [
      path.resolve(rootPath, 'tsconfig.json'),
      path.resolve(rootPath, 'tsconfig.dev.json'),
    ],

    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'quote-props': ['error', 'as-needed'],
    'import/no-unresolved': 0,
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2],
  },
};
