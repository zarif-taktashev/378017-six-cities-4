import React from "react";
import renderer from "react-test-renderer";
import withSorting from "./with-sorting.js";
import {SortOffersType} from "../../const.js";

const MockComponent = () => {
  return (
    <div />
  );
};

const MockComponentWrapped = withSorting(MockComponent);

it(`withCardList is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      onSortChange={() => {}}
      sortType={SortOffersType.POPULAR}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
