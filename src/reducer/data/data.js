import {extend} from '../../utils';
import {offerAdapter} from "../../adapter/offers.js";

const initialState = {
  offers: [],
  favoriteHotels: [],
  serverMessage: null,
};

const ActionType = {
  LOAD_HOTEL: `LOAD_HOTEL`,
  LOAD_FAVORITE_HOTELS: `LOAD_FAVORITE_HOTELS`,
  LOAD_MESSAGE_SERVER: `LOAD_MESSAGE_SERVER`
};

const ActionCreator = {
  loadHotels: (hotels) => ({
    type: ActionType.LOAD_HOTEL,
    payload: hotels
  }),
  loadServerMessage: (message) => ({
    type: ActionType.LOAD_MESSAGE_SERVER,
    payload: message
  }),
  loadFavoriteHotels: (offers) => ({
    type: ActionType.LOAD_FAVORITE_HOTELS,
    payload: offers
  }),
};

const Operations = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadHotels(response.data.map((item) => offerAdapter(item))));
        return response.data[0].city.name;
      });
  },
  loadFavoriteHotels: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteHotels(response.data));
      });
  },
  setFavoriteOffer: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${+!status}`)
      .then(() => {
        dispatch(Operations.loadHotels());
        dispatch(Operations.loadFavoriteHotels());
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTEL:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.LOAD_FAVORITE_HOTELS:
      return extend(state, {
        favoriteHotels: action.payload
      });
    case ActionType.LOAD_MESSAGE_SERVER:
      return extend(state, {
        serverMessage: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations, initialState};

