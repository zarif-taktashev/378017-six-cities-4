import {extend} from '../../utils';
import {offerAdapter} from "../../adapter/offers.js";

const initialState = {
  offers: [],
  favoriteHotels: [],
  nearOffers: [],
  isBlocked: false,
  reviews: [],
  serverMessage: null,
};

const ActionType = {
  LOAD_HOTEL: `LOAD_HOTEL`,
  LOAD_NEAR_OFFERS: `GET_NEAR_OFFERS`,
  LOAD_FAVORITE_HOTELS: `LOAD_FAVORITE_HOTELS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_MESSAGE_SERVER: `LOAD_MESSAGE_SERVER`,
  BLOCKED_FORM: `BLOCKED_FORM`
};

const ActionCreator = {
  loadHotels: (hotels) => ({
    type: ActionType.LOAD_HOTEL,
    payload: hotels
  }),
  setBlocking: (value) => ({
    type: ActionType.BLOCKED_FORM,
    payload: value
  }),
  loadServerMessage: (message) => ({
    type: ActionType.LOAD_MESSAGE_SERVER,
    payload: message
  }),
  loadNearOffers: (nearOffers) => ({
    type: ActionType.LOAD_NEAR_OFFERS,
    payload: nearOffers
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
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
  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
  },
  loadNearOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.loadNearOffers(response.data));
      });
  },
  loadFavoriteHotels: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteHotels(response.data));
      });
  },
  sendReview: (id, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setBlocking(true));

    return api.post(`/comments/${id}`, review)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
        dispatch(ActionCreator.loadMessageServer(response));
        dispatch(ActionCreator.setBlocking(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.setBlocking(false));

        throw err;
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
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });
    case ActionType.BLOCKED_FORM:
      return extend(state, {
        isBlocked: action.payload
      });
    case ActionType.LOAD_NEAR_OFFERS:
      return extend(state, {
        nearOffers: action.payload
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

