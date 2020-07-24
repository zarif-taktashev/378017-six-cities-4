import React from "react";
import renderer from "react-test-renderer";
import Tower from "./tower.jsx";

describe(`Towers-test`, () => {
  it(`Towers unit test`, () => {
    const tree = renderer
      .create(<Tower
        towerInformation={`Paris`}
        onSelectCity={() => {}}
        activeCity={`Paris`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
