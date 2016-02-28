module.exports = {
  context: __dirname + '/src',
  entry: './microbus',
  output: {
    path: __dirname + '/dist',
    filename: 'angular-microbus.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=es2015'
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};
