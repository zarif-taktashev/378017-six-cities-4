import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const offer = {
  img: `img/apartment-01.jpg`,
  premium: true,
  costs: 120,
  banner: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  rate: 80,
  coordinates: [52.3809553943508, 4.939309666406198]
};

describe(`card-e2e`, () => {
  it(`card-e2e-test`, () => {
    const onCardHandler = jest.fn((...args) => [...args]);

    const mainComp = shallow(
        <Card
          offer={offer}
          onCardHandler={onCardHandler}
        />
    );

    const article = mainComp.find(`article`);
    const articlePrevention = jest.fn();
    article.simulate(`mouseover`, {
      preventDefault: articlePrevention,
    });

    expect(onCardHandler.mock.calls[0][0]).toMatchObject(offer);
  });
});

