const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..', './build'),
    clean: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {},
      }),
    ],
  },
};
