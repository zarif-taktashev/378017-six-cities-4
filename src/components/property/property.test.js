import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Property} from './property.jsx';
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

it(`check render Property`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Property
          onTitleClick={() => {}}
          onMainHandler={() => {}}
          openedOfferId={`1`}
          offers={offers}
          onCardHover={() => {}}
          onFavoriteOfferClick={() => {}}
          isBlocked={true}
          onReviewSubmit={() => {}}
          nearOffers={offers}
          reviews={reviews}
          offer={offers[0]}
        />
      </Router>,
      {
        createNodeMock: () => document.createElement(`div`)
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
