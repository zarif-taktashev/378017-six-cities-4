import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Header from './header';

const authorizationStatus = `AUTH`;

it(`check render Header`, () => {
  const tree = renderer.create(
      <Header
        onMainHandler={() => {}}
        authorizationStatus={authorizationStatus}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
