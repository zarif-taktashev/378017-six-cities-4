import {extend} from '../../utils';
import {offerAdapter} from "../../adapter/offers.js";

const initialState = {
  offers: [],
};

const ActionType = {
  LOAD_HOTEL: `LOAD_HOTEL`,
};

const ActionCreator = {
  loadHotels: (hotels) => ({
    type: ActionType.LOAD_HOTEL,
    payload: hotels
  }),
};

const Operations = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadHotels(response.data.map((item) => offerAdapter(item))));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_HOTEL:
      return extend(state, {
        offers: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations, initialState};

