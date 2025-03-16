import React from 'react';
import { render, screen } from '@testing-library/react';
import { useCharacters } from '../useCharacters';
import { getCharacters } from 'domain/usecases/GetCharacters';
import { CharactersFilter, CharactersOrder } from 'domain/usecases/GetCharacters';
import { characterRepositoryImpl } from 'data/repositories/CharacterRepositoryImpl';
import LoadingIndicator from 'presentation/components/LoadingIndicator';
import { fakeCharactersResult } from 'test-helpers/fakeCharacters';

jest.mock('domain/usecases/GetCharacters');
const mockedGetCharacters = getCharacters as jest.MockedFunction<typeof getCharacters>;

interface TestComponentProps {
	filters: CharactersFilter;
	order: CharactersOrder;
	currentPage: number;
}

const TestComponent: React.FC<TestComponentProps> = ({ filters, order, currentPage }) => {
	const { data, loading, error } = useCharacters({ filters, order, currentPage });

	if (loading) return <LoadingIndicator />;
	if (error) return <div>{error}</div>;
	if (data) return <div>{data.results.map(character => character.name).join(', ')}</div>;

	return null;
};

describe('useCharacters', () => {
	beforeEach(() => {
		mockedGetCharacters.mockClear();
	});

	test('should fetch characters successfully', async () => {
		mockedGetCharacters.mockResolvedValueOnce(fakeCharactersResult);

		render(<TestComponent filters={{}} order={{ orderBy: 'name', direction: 'asc' }} currentPage={1} />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

		await screen.findByText(/Rick Sanchez, Morty Smith/i);
	});

	test('should handle error when fetching characters', async () => {
		mockedGetCharacters.mockRejectedValueOnce(new Error('No characters found'));

		render(<TestComponent filters={{}} order={{ orderBy: 'name', direction: 'asc' }} currentPage={1} />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

		await screen.findByText(/No characters found/i);
	});

	test('should apply filters correctly', async () => {
		const filters: CharactersFilter = { name: 'Rick', status: '', species: '', type: '', gender: '' };
		mockedGetCharacters.mockResolvedValueOnce(fakeCharactersResult);

		render(<TestComponent filters={filters} order={{ orderBy: 'name', direction: 'asc' }} currentPage={1} />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

		await screen.findByText(/Rick Sanchez, Morty Smith/i);

		expect(mockedGetCharacters).toHaveBeenCalledWith(
			characterRepositoryImpl,
			filters,
			{ orderBy: 'name', direction: 'asc' },
			1,
			expect.any(AbortSignal)
		);
	});

	test('should apply order correctly', async () => {
		const order: CharactersOrder = { orderBy: 'status', direction: 'desc' };
		mockedGetCharacters.mockResolvedValueOnce(fakeCharactersResult);

		render(<TestComponent filters={{}} order={order} currentPage={1} />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

		await screen.findByText(/Rick Sanchez, Morty Smith/i);

		expect(mockedGetCharacters).toHaveBeenCalledWith(
			characterRepositoryImpl,
			{},
			order,
			1,
			expect.any(AbortSignal)
		);
	});

	test('should handle page change correctly', async () => {
		mockedGetCharacters.mockResolvedValueOnce(fakeCharactersResult);

		render(<TestComponent filters={{}} order={{ orderBy: 'name', direction: 'asc' }} currentPage={2} />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

		await screen.findByText(/Rick Sanchez, Morty Smith/i);

		expect(mockedGetCharacters).toHaveBeenCalledWith(
			characterRepositoryImpl,
			{},
			{ orderBy: 'name', direction: 'asc' },
			2,
			expect.any(AbortSignal)
		);
	});
});
