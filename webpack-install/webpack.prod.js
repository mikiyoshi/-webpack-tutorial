const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';

module.exports = () =>
  webpackMerge(commonConf({ outputFile, assetFile }), {
    mode: 'production',
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body', // <body> 内に追加できる
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
    ],
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCssPlugin()],
    },
  });
