var path = require('path');

var webpackConfig = require('./webpack.config.js');

delete webpackConfig.entry;

webpackConfig.module.preLoaders.push([{
  test: /\.jsx?$/,
  include: path.resolve('src/'),
  exclude: /\.test\.jsx?$/,
  loader: 'isparta'
}]);

var karmaConfig = {
  // ... normal karma configuration
  frameworks: ['jasmine'],
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'src/**/*.test.js'
  ],
  preprocessors: {
    'src/**/*.test.js': ['webpack'],
    'src/main.js': ['webpack']
  },
  reporters: ['dots', 'coverage'],
  coverageReporter: {
    type: 'html',
    dir: 'build/coverage/'
  },
  webpack: webpackConfig,
  webpackMiddleware: {},
  browsers: ['PhantomJS'],
  plugins: [
    require('karma-webpack'),
    require('karma-spec-reporter'),
    require('karma-coverage'),
    require('karma-phantomjs-launcher'),
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('isparta-loader'),
    require('karma-junit-reporter')
  ]
};

module.exports = function (config) {
  config.set(karmaConfig);
};
