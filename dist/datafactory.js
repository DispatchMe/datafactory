(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash")) : factory(root["lodash"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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

	var _DataFactory = __webpack_require__(1);

	var _DataFactory2 = _interopRequireDefault(_DataFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	* Migrating from Babel >= 5.x to Babel >= 6.x, will most likely break your code
	* because Babel now have killed the CommonJS default export behaviour.
	*
	As a workaround, replace export default { … } with module.exports = { … }
	*/

	module.exports = _DataFactory2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(2);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Set the value to the namespace built from the path
	// ex path='addresses.hq', value=1, set obj.addresses.hq = 1;
	function parseDotNotation(path, val, obj) {
	  var currentObj = obj,
	      keys = path.split('.'),
	      i,
	      l = Math.max(1, keys.length - 1),
	      key;

	  for (i = 0; i < l; ++i) {
	    key = keys[i];
	    currentObj[key] = currentObj[key] || {};
	    currentObj = currentObj[key];
	  }

	  currentObj[keys[i]] = val;
	  delete obj[path];
	}

	function buildValue(defaults, opts, group) {
	  var output = {};

	  // Allow the root level to be a function
	  if (_lodash2.default.isFunction(defaults)) {
	    output = defaults(group);
	  } else {
	    _lodash2.default.forOwn(defaults, function (defaultVal, key) {
	      if (_lodash2.default.isFunction(defaultVal)) {
	        output[key] = defaultVal(group);
	      } else {
	        output[key] = defaultVal;
	      }
	    });
	  }

	  return _lodash2.default.extend(output, opts);
	}

	var Group = function Group(factory) {
	  _classCallCheck(this, Group);

	  var self = this;

	  self.data = {};

	  // Create builder functions
	  _lodash2.default.forOwn(factory._builders, function (defaults, key) {
	    var groupBuilder = function groupBuilder(opts) {
	      var output = buildValue(defaults, opts, self);

	      var dataKey = key;
	      // If there is a namespace (ex. 'address.hq') store the build docs on 'address'
	      if (dataKey.indexOf('.')) {
	        dataKey = key.split('.')[0];
	      }

	      // track the build doc in the group data
	      var builtDocs = self.data[dataKey] || [];
	      builtDocs.push(output);
	      self.data[dataKey] = builtDocs;

	      // Return the group to allow chaining and
	      // expose the output as the value property.
	      return _lodash2.default.extend({ value: output }, self);
	    };

	    // Allow builders to be namespaced via '.'
	    // ex. 'addresses.hq' -> factory.addresses.hq();
	    if (key.indexOf('.') > -1) {
	      parseDotNotation(key, groupBuilder, self);
	    } else {
	      self[key] = groupBuilder;
	    }
	  });
	};

	var DataFactory = (function () {
	  function DataFactory(builders) {
	    _classCallCheck(this, DataFactory);

	    var self = this;

	    self._builders = builders;

	    // Create a builder function for each root key
	    _lodash2.default.forOwn(builders, function (defaults, key) {
	      var builder = function builder(opts, group) {
	        return buildValue(defaults, opts, null);
	      };

	      // Allow builders to be namespaced via '.'
	      // ex. 'addresses.hq' -> factory.addresses.hq();
	      if (key.indexOf('.') > -1) {
	        parseDotNotation(key, builder, self);
	      } else {
	        self[key] = builder;
	      }
	    });
	  }

	  _createClass(DataFactory, [{
	    key: 'createGroup',
	    value: function createGroup() {
	      return new Group(this);
	    }
	  }]);

	  return DataFactory;
	})();

	exports.default = DataFactory;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;