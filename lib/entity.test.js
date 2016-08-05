'use strict';

var _circumstance = require('circumstance');

var _entity = require('./entity.js');

var CRUD = _interopRequireWildcard(_entity);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('CRUD Entity', function () {
  it('should init state', function () {
    (0, _circumstance.given)(CRUD.initState()).then(CRUD.isInitialState, (0, _circumstance.shouldEqual)(true));
  });

  it('should handle waiting state', function () {
    (0, _circumstance.given)(CRUD.initState()).when(CRUD.handleWaiting()).then(CRUD.isWaiting, (0, _circumstance.shouldEqual)(true));
  });

  it('should handle success state', function () {
    (0, _circumstance.given)(CRUD.initState()).when(CRUD.handleSuccess('Operation Success')).then(CRUD.isSuccess, (0, _circumstance.shouldEqual)(true));
  });

  it('should handle fail state', function () {
    (0, _circumstance.given)(CRUD.initState()).when(CRUD.handleFail('has some exceptions')).then(CRUD.isFailure, (0, _circumstance.shouldEqual)(true));
  });
});