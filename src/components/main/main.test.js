import React from "react";
import renderer from "react-test-renderer";
import {Router} from 'react-router-dom';
import {MainComponent} from "./main.jsx";
import history from '../../history';

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

const activeCity = `Paris`;
const authorizationStatus = `AUTH`;

describe(`main-test`, () => {
  it(`Main unit test`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <MainComponent
              onSelectCity={() => {}}
              onMainHandler={() => {}}
              onFavoriteOfferClick={() => {}}
              offers={offers}
              activeCity={activeCity}
              authorizationStatus={authorizationStatus}
              towers={[`Paris`, `Hamburg`, `Amsterdam`]}
            />
          </Router>,
      {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
