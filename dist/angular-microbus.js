/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Bus = __webpack_require__(1);

	var busApp = module.exports = angular.module('microbus', []);

	busApp.service('microbus', Bus);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bus = function () {
	  function Bus() {
	    _classCallCheck(this, Bus);

	    this.consumers = {};
	  }

	  _createClass(Bus, [{
	    key: 'consume',
	    value: function consume(cb, opts) {
	      // TODO: Throw errror if no key is set
	      var listenerNamespace = initListenerNamespace(this.consumers, opts.key);
	      listenerNamespace.push(cb);
	    }
	  }, {
	    key: 'push',
	    value: function push(data, opts) {
	      var listenerNamespace = initListenerNamespace(this.consumers, opts.key);
	      listenerNamespace.forEach(function (cb) {
	        return cb.call();
	      });
	    }
	  }]);

	  return Bus;
	}();

	function initListenerNamespace(consumers, key) {
	  var keyParts = key.split('.');
	  if (!consumers[keyParts[0]]) {
	    consumers[keyParts[0]] = { listeners: [], children: {} };
	  }
	  if (keyParts.length === 1) {
	    return consumers[key].listeners;
	  } else {
	    var nsIndex = key.indexOf('.');
	    return initListenerNamespace(consumers[keyParts[0]].children, key.substr(nsIndex + 1));
	  }
	}

	module.exports = Bus;

/***/ }
/******/ ]);