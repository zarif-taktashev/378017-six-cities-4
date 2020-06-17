import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const offers = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`,
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
