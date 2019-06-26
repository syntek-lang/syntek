module.exports = {
  extends: '@syntek/syntek/typescript',
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
