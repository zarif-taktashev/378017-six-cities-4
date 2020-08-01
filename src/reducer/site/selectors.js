import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.SITE;

export const getActiveCity = (state) => {
  return state[NAME_SPACE].activeCity;
};
