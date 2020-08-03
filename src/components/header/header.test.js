import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import Header from './header';
import history from '../../history';


const authorizationStatus = `AUTH`;

it(`check render Header`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Header
          onMainHandler={() => {}}
          authorizationStatus={authorizationStatus}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
