import React from "react";
import renderer from "react-test-renderer";
import Main from "./main-component.jsx";

const offers = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`,
];

describe(`main-test`, () => {
  it(`Main unit test`, () => {
    const tree = renderer
      .create(<Main
        placesQuantity={315}
        offers={offers}
        onMainHandler={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
