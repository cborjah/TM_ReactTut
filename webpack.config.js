const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// NODE_ENV to production
// uglify

let config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    // Add publicPath so when the page is refreshed, ReactRouter can take over
    // and load the appropriate component. Else, the app will ping the server for
    // the assets.
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  // Add devServer so when the page is refreshed, ReactRouter can take over
  // and load the appropriate component Else, the app will ping the server for
  // the assets.
  devServer: {
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html'
  })]
}

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyPlugin()
  )
}

module.exports = config;
