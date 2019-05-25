const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.config.common');

const genConfig = ({
  entry, filename, library, libraryTarget, ...config
}) => ({
  ...common,
  ...config,
  mode: 'development',
  entry,
  output: {
    filename,
    library,
    libraryTarget,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        TESS_ENV: JSON.stringify('development'),
      },
    }),
  ],
});

module.exports = [
  genConfig({
    entry: path.resolve(__dirname, '..', 'src', 'index.js'),
    filename: 'tesseract.dev.js',
    library: 'Tesseract',
    libraryTarget: 'umd',
  }),
  genConfig({
    entry: path.resolve(__dirname, '..', 'src', 'index.js'),
    filename: 'tesseract.asm.dev.js',
    library: 'Tesseract',
    libraryTarget: 'umd',
    resolve: {
      alias: {
        'tesseract.js-core/tesseract-core.wasm.js': 'tesseract.js-core/tesseract-core.asm.js',
      },
    },
  }),
];
