import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const offers = [
  {
    img: `img/apartment-01.jpg`,
    premium: true,
    costs: 120,
    banner: `1 Beautiful great location`,
    type: `Apartment`,
    rate: 80
  },
  {
    img: `img/apartment-02.jpg`,
    premium: false,
    costs: 50,
    banner: `2 Beautiful`,
    type: `Apartment`,
    rate: 70
  },
  {
    img: `img/apartment-03.jpg`,
    premium: true,
    costs: 80,
    banner: `luxurious apartment at great location`,
    type: `Private room`,
    rate: 20
  },
  {
    img: `img/apartment-01.jpg`,
    premium: false,
    costs: 10,
    banner: `great location`,
    type: `Private room`,
    rate: 50
  }
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

