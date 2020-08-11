import * as React from "react";
import * as renderer from "react-test-renderer";
import ErrorMessage from "./error-message";

it(`Render with ErrorMessage`, () => {
  const tree = renderer
    .create(
        <ErrorMessage
          loginError={`Faild to complete action`}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

