"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFail = exports.handleSuccess = exports.handleWaiting = exports.isFailure = exports.isSuccess = exports.isWaiting = exports.isInitialState = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.initState = initState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInitialState = exports.isInitialState = function isInitialState(state) {
  return !state.request && !state.success;
};
var isWaiting = exports.isWaiting = function isWaiting(state) {
  return state.waiting;
};
var isSuccess = exports.isSuccess = function isSuccess(state) {
  return state.success && !!state.result;
};
var isFailure = exports.isFailure = function isFailure(state) {
  return !!state.error;
};

function initState() {
  return { waiting: false, success: false };
}

var handleWaiting = exports.handleWaiting = function handleWaiting() {
  return function (state) {
    return (0, _extends3.default)({}, state, {
      waiting: true
    });
  };
};

var handleSuccess = exports.handleSuccess = function handleSuccess(result) {
  return function (state) {
    return (0, _extends3.default)({}, state, {
      waiting: false,
      success: true,
      error: null,
      result: result
    });
  };
};

var handleFail = exports.handleFail = function handleFail(error) {
  return function (state) {
    return (0, _extends3.default)({}, state, {
      waiting: false,
      success: false,
      error: error
    });
  };
};