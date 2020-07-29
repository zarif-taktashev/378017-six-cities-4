import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe(`app-test`, () => {
  it(`App unit test`, () => {
    const store = mockStore({
      activeCity: `Amsterdam`,
      offers: [],
      towers: []
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App />
      </Provider>,
      {
        createNodeMock: () => document.createElement(`div`)
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

