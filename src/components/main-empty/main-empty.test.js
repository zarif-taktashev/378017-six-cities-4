import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import MainEmpty from './main-empty.jsx';
import history from '../../history';

it(`check render MainEmpty`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <MainEmpty
          currentCity={`Amstedam`}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
