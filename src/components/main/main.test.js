import React from "react";
import renderer from "react-test-renderer";
import {MainComponent} from "./main.jsx";

const offers = [
  {
    city: `Amsterdam`,
    offersList: [
      {
        img: `img/apartment-01.jpg`,
        premium: true,
        costs: 120,
        city: `Amsterdam`,
        banner: `1 Beautiful & luxurious apartment at great location`,
        type: `Apartment`,
        rate: 80,
        coordinates: [52.3909553943508, 4.85309666406198]
      },
      {
        img: `img/apartment-02.jpg`,
        premium: false,
        costs: 50,
        banner: `2 Beautiful & luxurious apartment at great location`,
        type: `Apartment`,
        rate: 70,
        coordinates: [52.369553943508, 4.85309666406198]
      },
      {
        img: `img/apartment-03.jpg`,
        premium: true,
        costs: 80,
        banner: `3 Beautiful & luxurious apartment at great location`,
        type: `Private room`,
        rate: 20,
        coordinates: [52.3909553943508, 4.929309666406198]
      },
      {
        img: `img/apartment-01.jpg`,
        premium: false,
        costs: 10,
        banner: `4 Beautiful & luxurious apartment at great location`,
        type: `Private room`,
        rate: 50,
        coordinates: [52.3809553943508, 4.939309666406198]
      }
    ]
  },
  {
    city: `Paris`,
    offersList: [
      {
        img: `img/apartment-01.jpg`,
        premium: true,
        costs: 120,
        banner: `Paris 1 Beautiful & luxurious apartment at great location`,
        type: `Apartment`,
        rate: 80,
        coordinates: [52.3909553943508, 4.85309666406198]
      },
      {
        img: `img/apartment-02.jpg`,
        premium: false,
        costs: 50,
        banner: `Paris 2 Beautiful & luxurious apartment at great location`,
        type: `Apartment`,
        rate: 70,
        coordinates: [52.369553943508, 4.85309666406198]
      },
      {
        img: `img/apartment-03.jpg`,
        premium: true,
        costs: 80,
        banner: `Paris 3 Beautiful & luxurious apartment at great location`,
        type: `Private room`,
        rate: 20,
        coordinates: [52.3909553943508, 4.929309666406198]
      },
      {
        img: `img/apartment-01.jpg`,
        premium: false,
        costs: 10,
        banner: `Paris Beautiful & luxurious apartment at great location`,
        type: `Private room`,
        rate: 50,
        coordinates: [52.3809553943508, 4.939309666406198]
      }
    ]
  }
];

const activeCity = `Paris`;

describe(`main-test`, () => {
  it(`Main unit test`, () => {
    const tree = renderer
      .create(<MainComponent
        onSelectCity={() => {}}
        onMainHandler={() => {}}
        offers={offers}
        activeCity={activeCity}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
