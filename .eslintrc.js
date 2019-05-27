module.exports = {
  extends: 'eslint-config-syntek/typescript',
  rules: {
    'no-loop-func': 'off',
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
