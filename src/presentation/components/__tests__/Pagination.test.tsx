import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
	const mockOnPrev = jest.fn();
	const mockOnNext = jest.fn();

	const defaultProps = {
		currentPage: 1,
		totalPages: 5,
		onPrev: mockOnPrev,
		onNext: mockOnNext
	};

	const defaultPropsPage2 = {
		currentPage: 2,
		totalPages: 5,
		onPrev: mockOnPrev,
		onNext: mockOnNext
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render pagination controls', () => {
		render(<Pagination {...defaultProps} />);

		expect(screen.getByText(/Page 1 of 5/i)).toBeInTheDocument();
		expect(screen.getByText(/Prev/i)).toBeInTheDocument();
		expect(screen.getByText(/Next/i)).toBeInTheDocument();
	});

	test('should call onPrev when Prev button is clicked', () => {
		render(<Pagination {...defaultPropsPage2} />);

		const prevButton = screen.getByRole('button', { name: /Prev/i });
		fireEvent.click(prevButton);

		expect(mockOnPrev).toHaveBeenCalled();
	});

	test('should call onNext when Next button is clicked', () => {
		render(<Pagination {...defaultProps} />);

		const nextButton = screen.getByRole('button', { name: /Next/i });
		fireEvent.click(nextButton);

		expect(mockOnNext).toHaveBeenCalled();
	});

	test('should disable Prev button on first page', () => {
		render(<Pagination {...defaultProps} currentPage={1} />);

		const prevButton = screen.getByRole('button', { name: /Prev/i });
		expect(prevButton).toBeDisabled();
	});

	test('should disable Next button on last page', () => {
		render(<Pagination {...defaultProps} currentPage={5} />);

		const nextButton = screen.getByRole('button', { name: /Next/i });
		expect(nextButton).toBeDisabled();
	});
});
