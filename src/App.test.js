import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';
import IconLoadingComp from './components/IconLoadingComp';
import ListForeCastComp from './components/ListForeCastComp';

import fetchDataReducer from './utils/fetchDataReducer'


describe('IconLoading Component', () => {
	test('IconLoadingComp renders', () => {
		const component = renderer.create(<IconLoadingComp />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('ListForeCastComp Component', () => {
	test('ListForeCastComp renders', () => {
		let data = { title: 'Ho Chi Minh City - Vietnam', list: [{ id: 1, weather_state_abbr: 'hc', weather_state_name: 'Heavy Cloud', applicable_date: '2020-04-29', min_temp: '26', max_temp: 36 }] }

		const component = renderer.create(<ListForeCastComp data={data} />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('App Container Component', () => {
	test('Renders title weather web app', () => {
		const { getByText } = render(<App />);
		const linkElement = getByText('WEATHER FORECAST');
		expect(linkElement).toBeInTheDocument();
	});
});

describe('fetchDataReducer', () => {

	it('should return the INITIAL state', () => {
		expect(fetchDataReducer({}, {})).toEqual({});
	});

})