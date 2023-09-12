const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');const HtmlWebpackPlugin = require('html-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const Dotenv = require('dotenv-webpack');
const env = require('dotenv').config().parsed;

const ZIP_FILENAME = env.ZIP_FILENAME || 'default_name';

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          },
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/templates/page.hbs'),
      filename: 'index.html',
      inject: false
    }),
    new ZipWebpackPlugin({
      path: '../',
      filename: `${ZIP_FILENAME}.zip`,
    }),
    new Dotenv()
  ],
});