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
