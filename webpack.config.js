var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader : 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  node: {
    console: true,
    net: 'empty',
    tls: 'empty',
    debug:true,
    global: true,
   process: true,
   Buffer: true,
   setImmediate: true
  },
  output: {
    filename: 'script.min.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};
