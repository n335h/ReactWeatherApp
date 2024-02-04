// Search.test.js

import React from 'react';
import {
	render,
	fireEvent,
	screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './search';

describe('Search Component', () => {
	test('renders the Search component', () => {
		render(
			<Search
				location=''
				setLocation={() => {}}
				searchLocation={() => {}}
			/>
		);

		const inputElement =
			screen.getByTestId('searchBar');
		const buttonElement =
			screen.getByTestId('searchBtn');

		expect(inputElement).toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
	});

	test('calls searchLocation function when Enter key is pressed', () => {
		const searchLocationMock = jest.fn();
		render(
			<Search
				location=''
				setLocation={() => {}}
				searchLocation={searchLocationMock}
			/>
		);

		const inputElement =
			screen.getByTestId('searchBar');

		fireEvent.keyPress(inputElement, {
			key: 'Enter',
			code: 13,
			charCode: 13,
		});

		expect(
			searchLocationMock
		).toHaveBeenCalledTimes(1);
	});

	test('calls searchLocation function when Search button is clicked', () => {
		const searchLocationMock = jest.fn();
		render(
			<Search
				location=''
				setLocation={() => {}}
				searchLocation={searchLocationMock}
			/>
		);

		const buttonElement =
			screen.getByTestId('searchBtn');

		fireEvent.click(buttonElement);

		expect(
			searchLocationMock
		).toHaveBeenCalledTimes(1);
	});

	test('calls set location when input value changes', () => {
		const setLocationMock = jest.fn();

		render(
			<Search
				location=''
				setLocation={setLocationMock}
				searchLocation={() => {}}
			/>
		);

		const inputElement =
			screen.getByTestId('searchBar');

		fireEvent.change(inputElement, {
			target: { value: 'London' },
		});
		expect(setLocationMock).toHaveBeenCalledTimes(
			1
		);
		expect(setLocationMock).toHaveBeenCalledWith(
			'London'
		);
	});
});
