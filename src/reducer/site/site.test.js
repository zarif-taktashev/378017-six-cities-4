import {reducer, ActionType, ActionCreator} from "./site.js";

const sortTest = `Popular`;
const noop = {};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeCity: ``,
    sortType: `Popular`,
    hoverOffer: null,
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

it(`Reducer should change hover offer`, () => {
  expect(reducer({
    hoverOffer: null,
  }, {
    type: ActionType.SET_OFFER_HOVER,
    payload: {}
  })).toEqual({
    hoverOffer: {}
  });
});

it(`Reducer should change type sort`, () => {
  expect(reducer({
    sortType: `type`,
  }, {
    type: ActionType.SET_SORT_TYPE,
    payload: sortTest
  })).toEqual({
    sortType: sortTest
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.selectCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });

  it(`Action creator for set hover offer returns correct action`, () => {
    expect(ActionCreator.setHoverOffer(noop)).toEqual({
      type: ActionType.SET_OFFER_HOVER,
      payload: noop,
    });
  });

  it(`Action creator for set sort type returns correct action`, () => {
    expect(ActionCreator.setSortType(sortTest)).toEqual({
      type: ActionType.SET_SORT_TYPE,
      payload: sortTest,
    });
  });
});
