import {reducer, ActionType, ActionCreator} from "./site.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeCity: `Amsterdam`,
  });
});

it(`Reducer should change current city by a given value`, () => {
  expect(reducer({
    activeCity: `Amsterdam`,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Paris`,
  })).toEqual({
    activeCity: `Paris`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.selectCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });
});
