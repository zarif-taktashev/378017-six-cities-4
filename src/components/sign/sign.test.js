import React from "react";
import renderer from "react-test-renderer";
import {Sign} from "./sign.jsx";

describe(`main-test`, () => {
  it(`Main unit test`, () => {
    const tree = renderer
      .create(<Sign
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
