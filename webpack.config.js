var path = require('path');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    new UglifyJSPlugin()
  ],
  module: {
    noParse:[/alasql/],
    rules: [
      { test: /\.tag$/, loader: 'tag-loader', query: {compact: 'true'},  exclude: /node_modules/},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.png$/, loader: 'url-loader', query: { mimetype: 'image/png' } }

    ]
  },
  devServer: {
    contentBase: './dist'
  }
};
