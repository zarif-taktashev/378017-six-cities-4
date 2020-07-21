import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withCardList from "./with-card-list.js";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withCardList(MockComponent);

it(`withCardList is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={false}
      onPlayButtonClick={() => {}}
      src={``}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
