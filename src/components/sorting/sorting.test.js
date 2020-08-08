import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import Sorting from './sorting.jsx';
import {SortOffersType} from '../../const';
import history from '../../history';

it(`check render Sorting`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Sorting
          onSortChange={() => {}}
          sortType={SortOffersType.POPULAR}
          onSortClick={() => {}}
          viewSort={true}
        />
      </Router>,
      {
        createNodeMock: () => document.createElement(`div`)
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
