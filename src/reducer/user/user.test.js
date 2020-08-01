import {reducer, ActionType, ActionCreator, AuthorizationStatus, initialState} from "./user.js";

const user = {};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change current AuthorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
});

it(`Reducer should change current user by a given value`, () => {
  expect(reducer({
    user
  }, {
    type: ActionType.SET_USER,
    payload: {fake: true},
  })).toEqual({
    user: {fake: true}
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for requireAuthorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization({fake: true})).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {fake: true},
    });
  });
});
