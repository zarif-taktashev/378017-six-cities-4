import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const offers = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`,
];

describe(`app-test`, () => {
  it(`App unit test`, () => {
    const tree = renderer
      .create(<App
        placesQuantity={315}
        offers={offers}
        onMainHandler={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

