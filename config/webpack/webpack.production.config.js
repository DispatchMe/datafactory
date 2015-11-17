require('babel-core/register');

// Webpack config for creating the production bundle.

const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const PKG_LOCATION = path.join(__dirname, '../../package.json');
const config = require('../config');

module.exports = {
  entry: config.sourceDir,
  cache: false,
  debug: false,
  devtool: false,
  hot: false,
  build: true,
  output: {
    path: config.distDir,
    filename: config._app + '.js',
    libraryTarget: 'umd',
    library: console._app
  },
  externals: ['lodash'],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: ['node_modules'],
      include: path.join(__dirname, '../../src'),
      loader: 'babel-loader'
    }]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // Notifier
    new WebpackNotifierPlugin({
      title: 'datafactory',
      alwaysNotify: true
    }),
    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': false,
      'process.env.NODE_ENV': JSON.stringify('production'),
      VERSION: JSON.stringify(PKG_LOCATION.version)
    })
  ],
  eslint: {
    configFile: config.eslintDir,
    emitError: true,
    emitWarning: false
  }
};
