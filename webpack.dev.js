const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const injectScripts = require("webpack-dev-server-inject-scripts");
const Dotenv = require('dotenv-webpack');
const env = require('dotenv').config().parsed;
const globImporter = require('node-sass-glob-importer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
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
        ],
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'assets'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    devMiddleware: {
      index: "",
    },
    proxy: {
      "/": {
        target: env.PROXY_URL,
        changeOrigin: true,
      }
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.unshift({
        name: 'webpack-dev-server-inject-scripts',
        middleware: injectScripts(devServer)
      });

      return middlewares;
    },
  },
  plugins: [
    new Dotenv()
  ]
});