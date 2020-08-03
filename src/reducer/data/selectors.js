import NameSpace from "../name-space.js";
import {offerAdapter} from "../../adapter/offers.js";

export const getHotels = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getTowers = (state) => {
  return Array.from(new Set(state[NameSpace.DATA].offers.map((item) => item.city.name)));
};

export const getHotelsByCity = (state) => {
  return state[NameSpace.DATA].offers.filter((item) => item.city.name === state[NameSpace.SITE].activeCity);
};

export const getFavoriteHotels = (state) => {
  return state[NameSpace.DATA].favoriteHotels.map((item) => offerAdapter(item));
};
