import React from 'react';

// components for testing
import MusicSearch from '../react-client/src/components/MusicSearch.jsx';
import MusicInfo from '../react-client/src/components/MusicInfo.jsx';

// Note: test renderer must be required after react
import renderer from 'react-test-renderer';

it('renders react', () => {
  const div = renderer.create(React.createElement('h6', null, 'ok'));
  expect(div.toJSON()).toMatchSnapshot();
})

it('renders MusicSearch correctly', () => {
  const div = renderer.create(React.createElement('div', null, <MusicSearch />));
  expect(div.toJSON()).toMatchSnapshot();
})

it('renders MusicInfo correctly', () => {
  const div = renderer.create(React.createElement('div', null, <MusicInfo />));
  expect(div.toJSON()).toMatchSnapshot();
})
