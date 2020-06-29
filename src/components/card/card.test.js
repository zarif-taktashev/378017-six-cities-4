import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";

const offer = {
  img: `img/apartment-01.jpg`,
  premium: true,
  costs: 120,
  banner: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  rate: 80
};

describe(`Card-test`, () => {
  it(`Card Snapshot test`, () => {
    const onCardHandler = jest.fn();
    const tree = renderer
      .create(<Card
        offer={offer}
        onCardHandler={onCardHandler} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
