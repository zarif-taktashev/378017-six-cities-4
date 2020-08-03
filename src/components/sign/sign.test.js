import React from "react";
import renderer from "react-test-renderer";
import {Router} from 'react-router-dom';
import {Sign} from "./sign.jsx";
import history from '../../history';

describe(`sign-test`, () => {
  it(`Sign unit test`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <Sign onLoginSubmit={() => {}}/>
          </Router>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
