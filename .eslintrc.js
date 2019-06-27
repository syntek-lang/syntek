module.exports = {
  extends: '@syntek/syntek/typescript',
  rules: {
    'import/prefer-default-export': 'off',
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
