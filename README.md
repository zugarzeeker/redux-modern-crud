# redux-modern-crud

[![NPM version][npm-svg]][npm]
[![Build status][travis-svg]][travis]

[npm]: https://www.npmjs.com/package/redux-modern-crud
[npm-svg]: https://img.shields.io/npm/v/redux-modern-crud.svg?style=flat
[travis]: https://travis-ci.org/zugarzeeker/redux-modern-crud
[travis-svg]: https://img.shields.io/travis/zugarzeeker/redux-modern-crud.svg?style=flat


A library that helps you to manage `CRUD` for `Redux`.

```js
// main.js
import * as utility from './utility';
export { utility };
export { createActions } from './create-actions';
export { createReducer } from './create-reducer';
export { createInteractor } from './create-interactor';
export { mergeReducer } from './merge-reducer';
```

```js
// create-actions.js
import { getActionTypes } from './utility';

export const createActions = (prefix, key) => {
  const [REQUEST, SUCCESS, FAIL] = getActionTypes(prefix, key);
  return { REQUEST, SUCCESS, FAIL };
};
```

```js
// create-reducer.js
import { handleActions } from 'redux-actions';
import { handleWaiting, handleSuccess, handleFail, initState } from './entity';

const initialState = initState();
const initialAction = { type: 'init action' };
const defaultCallback = {
  callbackWaiting: () => {},
  callbackSuccess: () => {},
  callbackFail: () => {},
};

export const createReducer = (actions, multipleCallback) => {
  const { callbackWaiting, callbackSuccess, callbackFail } = {
    ...defaultCallback, ...multipleCallback
  };
  const { REQUEST, SUCCESS, FAIL } = actions;
  const reducer = handleActions({
    [REQUEST]: (state, action) => {
      callbackWaiting(state, action);
      return handleWaiting()(state);
    },
    [SUCCESS]: (state, action) => {
      callbackSuccess(state, action);
      return handleSuccess(action.result)(state);
    },
    [FAIL]: (state, action) => {
      callbackFail(state, action);
      return handleFail(action.error)(state);
    }
  }, initialState);
  return reducer;
};
```

```js
// entity.js
export const isInitialState = (state) => !state.request && !state.success;
export const isWaiting = (state) => state.waiting;
export const isSuccess = (state) => state.success && !!state.result;
export const isFailure = (state) => !!state.error;

export function initState() {
  return { waiting: false, success: false };
}

export const handleWaiting = () => (state) => ({
  ...state,
  waiting: true
});

export const handleSuccess = (result) => (state) => ({
  ...state,
  waiting: false,
  success: true,
  error: null,
  result
});

export const handleFail = (error) => (state) => ({
  ...state,
  waiting: false,
  success: false,
  error
});

```

```js
// entity.test.js
import { given, shouldEqual } from 'circumstance';
import * as CRUD from './entity.js';

describe('CRUD Entity', () => {
  it('should init state', () => {
    given(CRUD.initState())
    .then(CRUD.isInitialState, shouldEqual(true));
  });

  it('should handle waiting state', () => {
    given(CRUD.initState())
    .when(CRUD.handleWaiting())
    .then(CRUD.isWaiting, shouldEqual(true));
  });

  it('should handle success state', () => {
    given(CRUD.initState())
    .when(CRUD.handleSuccess('Operation Success'))
    .then(CRUD.isSuccess, shouldEqual(true));
  });

  it('should handle fail state', () => {
    given(CRUD.initState())
    .when(CRUD.handleFail('has some exceptions'))
    .then(CRUD.isFailure, shouldEqual(true));
  });
});
```

```js
// create-interactor.js
export const createInteractor = (actions) => {
  const { REQUEST, SUCCESS, FAIL } = actions;
  const formRequest = (method) => (url, data) => ({
    types: [REQUEST, SUCCESS, FAIL],
    promise: (client) => client[method](url, { data })
  });
  const httpRequest = {};
  const methods = ['get', 'put', 'post', 'delete', 'patch'];
  methods.map((method) => {
    return httpRequest[method] = formRequest(method);
  });
  return httpRequest;
};
```

```js
// merge-reducer.js
import _ from 'lodash';
import { initState } from './entity';

const initialState = initState();
export const mergeReducer = (multiReducers) => {
  const reducer = (state = initialState, action = initialAction) => {
    const found = _.find(multiReducers, ({ word, reducer }) => {
      return action.type.indexOf(word) !== -1;
    });
    if (!!found) {
      return found.reducer(state, action);
    }
    return state;
  };
  return reducer;
};
```

```js
// utility.js
import _ from 'lodash';

export const addPrefix = (prefix, asyncKeys, syncKeys) => {
  return _.fromPairs(
    asyncKeys.map(asyncKey => {
      return [(asyncKey || []), {
        REQUEST: `${prefix}/${asyncKey}_REQUEST`,
        SUCCESS: `${prefix}/${asyncKey}_SUCCESS`,
        FAIL: `${prefix}/${asyncKey}_FAIL`
      }];
    }).concat((syncKeys || []).map(syncKey => {
      return [syncKey, `${prefix}/${syncKey}`];
    }))
  );
};

export const getActionTypes = (prefix, key) => {
  return [
    `${prefix}/${key}_REQUEST`,
    `${prefix}/${key}_SUCCESS`,
    `${prefix}/${key}_FAIL`
  ];
};
```
