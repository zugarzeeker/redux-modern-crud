'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionTypes = exports.addPrefix = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addPrefix = exports.addPrefix = function addPrefix(prefix, asyncKeys, syncKeys) {
  return _lodash2.default.fromPairs(asyncKeys.map(function (asyncKey) {
    return [asyncKey || [], {
      REQUEST: prefix + '/' + asyncKey + '_REQUEST',
      SUCCESS: prefix + '/' + asyncKey + '_SUCCESS',
      FAIL: prefix + '/' + asyncKey + '_FAIL'
    }];
  }).concat((syncKeys || []).map(function (syncKey) {
    return [syncKey, prefix + '/' + syncKey];
  })));
};

var getActionTypes = exports.getActionTypes = function getActionTypes(prefix, key) {
  return [prefix + '/' + key + '_REQUEST', prefix + '/' + key + '_SUCCESS', prefix + '/' + key + '_FAIL'];
};

exports.default = {
  getActionTypes: getActionTypes,
  addPrefix: addPrefix
};