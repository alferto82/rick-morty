import { getCharacters } from '../GetCharacters';
import { CharacterRepository } from 'data/repositories/CharacterRepository';
import { CharactersFilter, CharactersOrder, CharactersResult } from '../GetCharacters';
import { fakeCharacters } from 'test-helpers/fakeCharacters';

describe('getCharacters', () => {
	let mockRepository: jest.Mocked<CharacterRepository>;

	beforeEach(() => {
		mockRepository = {
			getAll: jest.fn()
		} as unknown as jest.Mocked<CharacterRepository>;
	});

	it('should fetch characters successfully', async () => {
		const fakeResult: CharactersResult = {
			results: fakeCharacters,
			totalCount: 2,
			totalPages: 1
		};
		mockRepository.getAll.mockResolvedValueOnce(fakeResult);

		const result = await getCharacters(mockRepository, {}, {}, 1);

		expect(result).toEqual(fakeResult);
		expect(mockRepository.getAll).toHaveBeenCalledWith({}, 1, undefined);
	});

	it('should apply filters correctly', async () => {
		const fakeResult: CharactersResult = {
			results: fakeCharacters,
			totalCount: 2,
			totalPages: 1
		};
		const filters: CharactersFilter = { name: 'Rick' };
		mockRepository.getAll.mockResolvedValueOnce(fakeResult);

		const result = await getCharacters(mockRepository, filters, {}, 1);

		expect(result).toEqual(fakeResult);
		expect(mockRepository.getAll).toHaveBeenCalledWith(filters, 1, undefined);
	});

	it('should apply sorting correctly', async () => {
		const fakeResult: CharactersResult = {
			results: fakeCharacters,
			totalCount: 2,
			totalPages: 1
		};
		const order: CharactersOrder = { orderBy: 'name', direction: 'desc' };
		mockRepository.getAll.mockResolvedValueOnce(fakeResult);

		const result = await getCharacters(mockRepository, {}, order, 1);

		expect(result.results[0].name).toBe('Rick Sanchez');
		expect(result.results[1].name).toBe('Morty Smith');
		expect(mockRepository.getAll).toHaveBeenCalledWith({}, 1, undefined);
	});

	it('should handle fetch error', async () => {
		mockRepository.getAll.mockRejectedValueOnce(new Error('Failed to fetch characters'));

		await expect(getCharacters(mockRepository, {}, {}, 1)).rejects.toThrow('Failed to fetch characters');
	});
});
