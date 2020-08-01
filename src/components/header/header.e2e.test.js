import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./header.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const authorizationStatus = `AUTH`;

describe(`header-e2e`, () => {
  it(`header-e2e-test`, () => {
    const onMainHandler = jest.fn();

    const headerComp = shallow(
        <Header
          onMainHandler={onMainHandler}
          authorizationStatus={authorizationStatus}
        />
    );

    const header = headerComp.find(`header`);
    header.simulate(`click`);
    expect(onMainHandler.mock.calls.length).toBe(1);
  });
});
