import React from "react";
import renderer from "react-test-renderer";
import Tower from "./towers.jsx";

const offers = [`Amsterdam`, `Paris`];

describe(`Towers-test`, () => {
  it(`Towers unit test`, () => {
    const tree = renderer
      .create(<Tower
        towers={offers}
        onSelectCity={() => {}}
        activeCity={`Paris`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
