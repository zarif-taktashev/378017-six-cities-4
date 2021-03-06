import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import Review from './review.jsx';
import history from '../../history';

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

it(`check render Review`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Review
          reviews={reviews[0]}
        />
      </Router>,
      {
        createNodeMock: () => document.createElement(`div`)
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
