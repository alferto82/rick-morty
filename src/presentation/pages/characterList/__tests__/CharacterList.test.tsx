import { render, screen, fireEvent } from '@testing-library/react';
import { useCharacters } from 'presentation/hooks/useCharacters';
import CharacterList from '../CharacterList';
import { MemoryRouter } from 'react-router-dom';
import { fakeCharacters } from 'test-helpers/fakeCharacters';

jest.mock('presentation/hooks/useCharacters');
const mockedUseCharacters = useCharacters as jest.MockedFunction<typeof useCharacters>;

describe('CharacterList', () => {
	beforeEach(() => {
		mockedUseCharacters.mockClear();
	});

	test('should display loading state initially', () => {
		mockedUseCharacters.mockReturnValue({ data: null, loading: true, error: null });

		render(
			<MemoryRouter>
				<CharacterList />
			</MemoryRouter>
		);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
	});

	test('should display character list when data is fetched successfully', async () => {
		mockedUseCharacters.mockReturnValue({
			data: {
				results: fakeCharacters,
				totalPages: 1,
				totalCount: 2
			},
			loading: false,
			error: null
		});

		render(
			<MemoryRouter>
				<CharacterList />
			</MemoryRouter>
		);

		await screen.findByText(/Rick Sanchez/i);
		expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
	});

	test('should display error message when there is an error', async () => {
		mockedUseCharacters.mockReturnValue({ data: null, loading: false, error: 'No characters found' });

		render(
			<MemoryRouter>
				<CharacterList />
			</MemoryRouter>
		);

		await screen.findByText(/No characters found/i);
	});

	test('should handle pagination correctly', async () => {
		mockedUseCharacters.mockReturnValue({
			data: { results: fakeCharacters, totalPages: 2, totalCount: 2 },
			loading: false,
			error: null
		});

		render(
			<MemoryRouter>
				<CharacterList />
			</MemoryRouter>
		);

		await screen.findByText(/Rick Sanchez/i);

		const nextButton = screen.getAllByText(/Next/i);
		fireEvent.click(nextButton[0]);

		expect(mockedUseCharacters).toHaveBeenCalledWith(expect.objectContaining({ currentPage: 2 }));
	});
});
