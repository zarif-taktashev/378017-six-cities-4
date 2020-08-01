import {reducer, ActionCreator, ActionType, initialState, Operations} from "./data";
import {createAPI} from '../../api';
import MockAdapter from "axios-mock-adapter";
import {postAdapter} from "../../adapter/offers.js";


const offers = [{
  bedrooms: 5,
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
  goods: [`Laptop friendly workspace`],
  host: {
    id: 25, name: `Angelina`, isPro: true, avatarUrl: `img/avatar-angelina.jpg`
  },
  id: 1,
  images: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 52.385540000000006,
    longitude: 4.886976,
    zoom: 16
  },
  maxAdults: 6,
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
  price: 813,
  rating: 2.4,
  title: `Wood and stone place`,
  type: `house`,
}];

const api = createAPI(() => {});

describe(`test work Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change offers`, () => {
    expect(reducer({
      offers: [],
    }, {
      type: ActionType.LOAD_HOTEL,
      payload: offers
    })).toEqual({
      offers
    });
  });
});

describe(`test work Action Creators`, () => {
  it(`Action creator for offers returns correct action`, () => {
    expect(ActionCreator.loadHotels(offers)).toEqual({
      type: ActionType.LOAD_HOTEL,
      payload: offers,
    });
  });
});

describe(`test work Operation`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelsLoader = Operations.loadHotels();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offers.map((item) => postAdapter(item)));

    return hotelsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_HOTEL,
          payload: offers,
        });
      });
  });
});