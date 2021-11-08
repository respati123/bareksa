const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common');

module.exports = (env, argEnv) => {
  const webpackConfig = require(`./webpack.${argEnv.mode}.js`);

  return webpackMerge.merge(webpackCommon, webpackConfig);
};
