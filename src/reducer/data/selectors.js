import NameSpace from "../name-space.js";

export const getHotels = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getTowers = (state) => {
  return Array.from(new Set(state[NameSpace.DATA].offers.map((item) => item.city.name)));
};

export const getHotelsByCity = (state) => {
  return state[NameSpace.DATA].offers.filter((item) => item.city.name === state[NameSpace.SITE].activeCity);
};

