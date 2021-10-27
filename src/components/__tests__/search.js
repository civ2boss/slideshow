import React from 'react';
import renderer from 'react-test-renderer';

import Search from '../search';

test('Search renders without crashing', () => {
  const component = renderer.create(<Search />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
