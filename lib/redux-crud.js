'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utility = exports.createInteractor = exports.mergeReducer = exports.createReducer = exports.createActions = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reduxActions = require('redux-actions');

var _utility = require('./utility');

var _utility2 = _interopRequireDefault(_utility);

var _entity = require('./entity');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _entity.initState)();
var initialAction = { type: 'init action' };
var initialCallback = {
  callbackWaiting: function callbackWaiting() {},
  callbackSuccess: function callbackSuccess() {},
  callbackFail: function callbackFail() {}
};

var createActions = function createActions(prefix, key) {
  var _utility$getActionTyp = _utility2.default.getActionTypes(prefix, key);

  var _utility$getActionTyp2 = (0, _slicedToArray3.default)(_utility$getActionTyp, 3);

  var REQUEST = _utility$getActionTyp2[0];
  var SUCCESS = _utility$getActionTyp2[1];
  var FAIL = _utility$getActionTyp2[2];

  return { REQUEST: REQUEST, SUCCESS: SUCCESS, FAIL: FAIL };
};

var createReducer = function createReducer(actions, multipleCallback) {
  var _handleActions;

  var _initialCallback$mult = (0, _extends3.default)({}, initialCallback, multipleCallback);

  var callbackWaiting = _initialCallback$mult.callbackWaiting;
  var callbackSuccess = _initialCallback$mult.callbackSuccess;
  var callbackFail = _initialCallback$mult.callbackFail;
  var REQUEST = actions.REQUEST;
  var SUCCESS = actions.SUCCESS;
  var FAIL = actions.FAIL;

  var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, (0, _defineProperty3.default)(_handleActions, REQUEST, function (state, action) {
    callbackWaiting(state, action);
    return (0, _entity.handleWaiting)()(state);
  }), (0, _defineProperty3.default)(_handleActions, SUCCESS, function (state, action) {
    callbackSuccess(state, action);
    return (0, _entity.handleSuccess)(action.result)(state);
  }), (0, _defineProperty3.default)(_handleActions, FAIL, function (state, action) {
    callbackFail(state, action);
    return (0, _entity.handleFail)(action.error)(state);
  }), _handleActions), initialState);
  return reducer;
};

var mergeReducer = function mergeReducer(multiReducers) {
  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments.length <= 1 || arguments[1] === undefined ? initialAction : arguments[1];

    var found = _lodash2.default.find(multiReducers, function (_ref) {
      var word = _ref.word;
      var reducer = _ref.reducer;

      return action.type.indexOf(word) !== -1;
    });
    if (!!found) {
      return found.reducer(state, action);
    }
    return state;
  };
  return reducer;
};

var createInteractor = function createInteractor(actions) {
  var REQUEST = actions.REQUEST;
  var SUCCESS = actions.SUCCESS;
  var FAIL = actions.FAIL;

  var httpRequest = function httpRequest(method, url, data) {
    return {
      types: [REQUEST, SUCCESS, FAIL],
      promise: function promise(client) {
        return client[method](url, { data: data });
      }
    };
  };
  return httpRequest;
};

exports.createActions = createActions;
exports.createReducer = createReducer;
exports.mergeReducer = mergeReducer;
exports.createInteractor = createInteractor;
exports.utility = _utility2.default;