import React from "react";
import renderer from "react-test-renderer";
import Towers from "./towers.jsx";

const towers = [`Amsterdam`, `Paris`];

describe(`Towers-test`, () => {
  it(`Towers unit test`, () => {
    const tree = renderer
      .create(<Towers
        towers={towers}
        onSelectCity={() => {}}
        activeCity={`Paris`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
