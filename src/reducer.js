import offers from "./mocks/offers.js";
import {extend} from "./utils.js";

const initialState = {
  activeCity: `Amsterdam`,
  offers,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`
};

const ActionCreator = {
  selectCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
