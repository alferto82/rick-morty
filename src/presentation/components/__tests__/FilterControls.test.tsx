import { render, screen, fireEvent } from '@testing-library/react';
import FilterControls from '../FilterControls';
import { CharactersFilter } from 'domain/usecases/GetCharacters';
import { Character } from 'domain/entities/Character';

describe('FilterControls', () => {
	const mockOnFilterChange = jest.fn();
	const mockOnOrderFieldChange = jest.fn();
	const mockOnOrderDirectionChange = jest.fn();

	const defaultProps = {
		filters: {} as CharactersFilter,
		orderField: 'name' as keyof Character,
		orderDirection: 'asc' as 'asc' | 'desc',
		onFilterChange: mockOnFilterChange,
		onOrderFieldChange: mockOnOrderFieldChange,
		onOrderDirectionChange: mockOnOrderDirectionChange
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render filter controls with expected texts and default select values', () => {
		render(<FilterControls {...defaultProps} />);

		expect(screen.getByPlaceholderText(/Search by name.../i)).toBeInTheDocument();

		expect(screen.getByText('Order')).toBeInTheDocument();
		expect(screen.getByText('Filters')).toBeInTheDocument();

		const selects = screen.getAllByRole('combobox');

		expect(selects[0]).toHaveValue('name');
		expect(selects[1]).toHaveValue('asc');

		expect(selects[2]).toHaveValue('all');
	});

	test('should call onFilterChange when name filter is changed', () => {
		render(<FilterControls {...defaultProps} />);

		const input = screen.getByPlaceholderText(/Search by name.../i);
		fireEvent.change(input, { target: { value: 'Rick' } });

		expect(mockOnFilterChange).toHaveBeenCalledWith({ ...defaultProps.filters, name: 'Rick' });
	});

	test('should call onOrderFieldChange when order field is changed', () => {
		render(<FilterControls {...defaultProps} />);

		const orderFieldSelect = screen.getAllByRole('combobox')[0];
		fireEvent.change(orderFieldSelect, { target: { value: 'status' } });

		expect(mockOnOrderFieldChange).toHaveBeenCalledWith('status');
	});

	test('should call onOrderDirectionChange when order direction is changed', () => {
		render(<FilterControls {...defaultProps} />);

		const selects = screen.getAllByRole('combobox');
		const orderDirectionSelect = selects[1];
		fireEvent.change(orderDirectionSelect, { target: { value: 'desc' } });

		expect(mockOnOrderDirectionChange).toHaveBeenCalledWith('desc');
	});

	test('should call onFilterChange when additional filters are changed', () => {
		render(<FilterControls {...defaultProps} />);

		const selects = screen.getAllByRole('combobox');
		const statusSelect = selects[2];

		fireEvent.change(statusSelect, { target: { value: 'Alive' } });

		expect(mockOnFilterChange).toHaveBeenCalledWith({ ...defaultProps.filters, status: 'Alive' });
	});
});
