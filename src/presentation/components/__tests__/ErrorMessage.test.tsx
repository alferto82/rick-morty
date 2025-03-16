import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn()
}));

const mockedUseNavigate = require('react-router-dom').useNavigate;

describe('ErrorMessage', () => {
	beforeEach(() => {
		mockedUseNavigate.mockClear();
	});

	test('should display error message', () => {
		render(
			<MemoryRouter>
				<ErrorMessage message="An error occurred" />
			</MemoryRouter>
		);

		expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
	});

	test('should display back button when showBack is true', () => {
		render(
			<MemoryRouter>
				<ErrorMessage message="An error occurred" showBack />
			</MemoryRouter>
		);

		expect(screen.getByText(/Back to Home/i)).toBeInTheDocument();
	});

	test('should navigate to home when back button is clicked', () => {
		const navigate = jest.fn();
		mockedUseNavigate.mockReturnValue(navigate);

		render(
			<MemoryRouter>
				<ErrorMessage message="An error occurred" showBack />
			</MemoryRouter>
		);

		const button = screen.getByText(/Back to Home/i);
		fireEvent.click(button);

		expect(navigate).toHaveBeenCalledWith('/');
	});
});
