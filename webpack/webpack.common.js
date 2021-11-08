const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const Webpack = require('webpack');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: path.join(__dirname, '..', './src/index.tsx'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '..', './build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /nodu_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css?/i,
        use: ['css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '..', './public/index.html'),
    }),
  ],
};
