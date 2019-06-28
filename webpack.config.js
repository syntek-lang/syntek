/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.tek$/,
        loader: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
    ],
  },
  output: {
    library: 'syntek',
    libraryTarget: 'umd',
    globalObject: "(typeof self !== 'undefined' ? self : this)", // https://github.com/webpack/webpack/issues/6522
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
  },
};
