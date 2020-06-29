import React from "react";
import renderer from "react-test-renderer";
import CardList from "./cardList.jsx";

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

describe(`main-test`, () => {
  it(`Main unit test`, () => {
    const tree = renderer
      .create(<CardList
        offers={offers} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
