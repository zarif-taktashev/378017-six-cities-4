import MockAdapter from "axios-mock-adapter";
import {reducer, ActionCreator, ActionType, initialState, Operations} from "./data";
import {createAPI} from '../../api';
import {postAdapter} from "../../adapter/offers.js";

const EmptyStr = ``;

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

const reviews = [
  {
    id: 1,
    user: {
      avatar: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
      id: 1,
      super: true,
      name: `Wood and stone place`
    },
    rating: 1,
    date: `20.03.02`,
    comment: `Done`,
  }
];

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

  it(`Reducer should change favoriteHotels`, () => {
    expect(reducer({
      favoriteHotels: [],
    }, {
      type: ActionType.LOAD_FAVORITE_HOTELS,
      payload: offers
    })).toEqual({
      favoriteHotels: offers
    });
  });

  it(`Reducer should change Bloked Form`, () => {
    expect(reducer({
      isBlocked: false,
    }, {
      type: ActionType.BLOCKED_FORM,
      payload: true
    })).toEqual({isBlocked: true});
  });

  it(`Reducer should change Message Server`, () => {
    expect(reducer({
      serverMessage: null,
    }, {
      type: ActionType.LOAD_MESSAGE_SERVER,
      payload: EmptyStr
    })).toEqual({serverMessage: EmptyStr});
  });

  it(`Reducer should change reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews
    })).toEqual({
      reviews
    });
  });

  it(`Reducer should change near offer`, () => {
    expect(reducer({
      nearOffers: [],
    }, {
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: offers
    })).toEqual({
      nearOffers: offers
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
  it(`Action creator for setBlocking`, () => {
    expect(ActionCreator.setBlocking(true)).toEqual({
      type: ActionType.BLOCKED_FORM,
      payload: true,
    });
  });
  it(`Action creator for loadServerMessage`, () => {
    expect(ActionCreator.loadServerMessage(EmptyStr)).toEqual({
      type: ActionType.LOAD_MESSAGE_SERVER,
      payload: EmptyStr,
    });
  });
  it(`Action creator for reviews returns correct action`, () => {
    expect(ActionCreator.loadReviews(reviews)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    });
  });
  it(`Action creator for nearOffers offer returns correct action`, () => {
    expect(ActionCreator.loadNearOffers(offers)).toEqual({
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: offers,
    });
  });
  it(`Action creator for loadFavoriteHotels`, () => {
    expect(ActionCreator.loadFavoriteHotels(offers)).toEqual({
      type: ActionType.LOAD_FAVORITE_HOTELS,
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

  it(`Should make a correct API call to /hotels/nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersNearLoader = Operations.loadNearOffers(3);

    apiMock
      .onGet(`/hotels/3/nearby`)
      .reply(200, [{fake: true}]);

    return offersNearLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEAR_OFFERS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operations.loadReviews(3);

    apiMock
      .onGet(`/comments/3`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operations.loadFavoriteHotels();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_HOTELS,
          payload: [{fake: true}],
        });
      });
  });
});
