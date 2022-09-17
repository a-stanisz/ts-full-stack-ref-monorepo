module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['**/dist/*', '**/node_modules/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2021',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/tests/**', '**/test/**'] },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-alert': 0,
    'no-catch-shadow': 0,
    'no-confusing-arrow': ['off'],
    'no-console': ['error', { allow: ['time', 'timeEnd'] }],
    'no-param-reassign': 'off',
    'no-restricted-exports': 'off',
    'no-restricted-globals': 0,
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'styled-components/macro',
            message: "Please don't import from styled-components/macro.",
          },
        ],
      },
    ],
    'no-return-await': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'class-methods-use-this': 0,
    'eslint-disable no-restricted-syntax': 0,
    'consistent-return': 'error',
    radix: ['error', 'as-needed'],
    'global-require': [0],
    semi: [2, 'never'],

    'object-curly-newline': 0,
    'function-paren-newline': 0,

    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
  },
};
