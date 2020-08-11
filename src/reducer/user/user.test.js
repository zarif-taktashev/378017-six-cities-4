import {reducer, ActionType, ActionCreator, AuthorizationStatus} from "./user.js";

const noop = {};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    isLoad: true,
    loginError: ``,
    user: null
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    isLoad: true,
  }, {
    type: ActionType.CHECK_LOADING,
    payload: false,
  })).toEqual({
    isLoad: false,
  });

  expect(reducer({
    loginError: null,
  }, {
    type: ActionType.SET_LOGIN_ERROR,
    payload: `lol`,
  })).toEqual({
    loginError: `lol`,
  });

  expect(reducer({
    user: ``,
  }, {
    type: ActionType.SET_USER,
    payload: `lol`,
  })).toEqual({
    user: `lol`,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.setUser(noop)).toEqual({
      type: ActionType.SET_USER,
      payload: noop,
    });

    expect(ActionCreator.setLoginError(``)).toEqual({
      type: ActionType.SET_LOGIN_ERROR,
      payload: ``,
    });

    expect(ActionCreator.checkLoading(true)).toEqual({
      type: ActionType.CHECK_LOADING,
      payload: true,
    });
  });
});
