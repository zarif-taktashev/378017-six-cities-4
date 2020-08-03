import React from "react";
import renderer from "react-test-renderer";
import NoFavorites from "./no-favorites.jsx";
import {Router} from 'react-router-dom';
import history from '../../history';


describe(`sign-test`, () => {
  it(`Sign unit test`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <NoFavorites/>
          </Router>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
