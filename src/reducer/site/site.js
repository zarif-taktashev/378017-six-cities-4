import {extend} from "../../utils.js";

const initialState = {
  activeCity: ``,
  sortType: `Popular`,
  hoverOffer: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_OFFER_HOVER: `SET_OFFER_HOVER`,
};

const ActionCreator = {
  selectCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  setHoverOffer: (offer) => ({
    type: ActionType.SET_OFFER_HOVER,
    payload: offer
  }),
  setSortType: (valueType) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: valueType
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
    case ActionType.SET_OFFER_HOVER:
      return extend(state, {
        hoverOffer: action.payload
      });
    case ActionType.SET_SORT_TYPE:
      return extend(state, {
        sortType: action.payload
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
