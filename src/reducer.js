import {extend} from "./utils.js";
import {offerAdapter} from "./adapter/offers.js"

const initialState = {
  activeCity: `Amsterdam`,
  offers: [],
  towers: []
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_HOTEL: `LOAD_HOTEL`,
  LOAD_TOWERS: `LOAD_TOWERS`
};

const ActionCreator = {
  selectCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  loadHotels: (hotels) => ({
    type: ActionType.LOAD_HOTEL,
    payload: hotels
  }),
  loadTowers: (towers) => ({
    type: ActionType.LOAD_TOWERS,
    payload: towers
  })
};

const Operations = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadHotels(response.data.map((item) => offerAdapter(item))));
        dispatch(ActionCreator.loadTowers(Array.from(new Set(response.data.map((item) => item.city.name)))));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
    case ActionType.LOAD_HOTEL:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.LOAD_TOWERS:
      return extend(state, {
        towers: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus, Operations};
