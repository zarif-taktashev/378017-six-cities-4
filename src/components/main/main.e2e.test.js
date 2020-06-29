import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

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

describe(`main-e2e`, () => {
  it(`main-e2e-test`, () => {
    const onMainHandler = jest.fn();

    const mainComp = shallow(
        <Main
          placesQuantity={315}
          offers={offers}
          onMainHandler={onMainHandler}
        />
    );

    const header = mainComp.find(`header`);
    header.simulate(`click`);

    expect(onMainHandler.mock.calls.length).toBe(1);
  });
});
