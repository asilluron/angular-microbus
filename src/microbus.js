let Bus = require('./Bus');

let busApp = module.exports = angular.module('microbus', []);

busApp.service('microbus', Bus);
