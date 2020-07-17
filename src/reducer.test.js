import {reducer, ActionType, ActionCreator} from "./reducer.js";
import offers from "./mocks/offers.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeCity: `Amsterdam`,
    offers,
  });
});

it(`Reducer should change current city by a given value`, () => {
  expect(reducer({
    activeCity: `Amsterdam`,
    offers,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Paris`,
  })).toEqual({
    activeCity: `Paris`,
    offers,
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
