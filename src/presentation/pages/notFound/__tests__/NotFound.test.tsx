import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn()
}));

const mockedUseNavigate = require('react-router-dom').useNavigate;

describe('NotFoundPage', () => {
	beforeEach(() => {
		mockedUseNavigate.mockClear();
	});

	test('should display 404 message', () => {
		render(
			<MemoryRouter>
				<NotFoundPage />
			</MemoryRouter>
		);

		expect(screen.getByText(/404 - Page not found/i)).toBeInTheDocument();
		expect(screen.getByText(/Sorry, this page does not exist../i)).toBeInTheDocument();
	});

	test('should navigate to home when button is clicked', () => {
		const navigate = jest.fn();
		mockedUseNavigate.mockReturnValue(navigate);

		render(
			<MemoryRouter>
				<NotFoundPage />
			</MemoryRouter>
		);

		const button = screen.getByText(/Back to home/i);
		fireEvent.click(button);

		expect(navigate).toHaveBeenCalledWith('/');
	});
});
