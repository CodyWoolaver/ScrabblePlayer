const path = require("path");
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '/scrabble_player/static/'),
  entry: './index',
  output: {
    path: path.resolve('./scrabble_player/webpack/bundles/'),
    filename: "[name]-[hash].js",
  },
  plugins: [
    new BundleTracker({filename: './scrabble_player/webpack/stats.json'}),
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader' ],
            fallback: 'style-loader'
        })
      }
    ]
  }
};
