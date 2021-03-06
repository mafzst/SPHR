var webpack = require('webpack');
// var nodeExternals = require('webpack-node-externals');

module.exports = {
  // target: 'node',
  // externals: [nodeExternals()],
  entry: {
    app: ['webpack/hot/dev-server', './javascripts/entry.js'],
  },

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".json"]
  },

  output: {
    path: './public/built',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },

  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ]
}
