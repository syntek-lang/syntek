module.exports = {
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'require-await': 'error',
    'no-restricted-syntax': 'off',
    'no-loop-func': 'off',
    'prefer-destructuring': 'off',
    'no-undef': 'off', // handled by tsc
    'no-unused-vars': 'off', // handled by tsc
    'import/named': 'off',
    'no-useless-constructor': 'off',
    'no-dupe-class-members': 'off',

    camelcase: 'off',
    '@typescript-eslint/camelcase': 'error',

    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: true, classes: true, variables: true }],

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', 'array'],
    '@typescript-eslint/ban-ts-ignore': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    '@typescript-eslint/generic-type-naming': 'error',
    '@typescript-eslint/interface-name-prefix': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-object-literal-type-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-triple-slash-reference': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-interface': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
