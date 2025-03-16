import { CharactersFilter } from 'domain/usecases/GetCharacters';
import { fakeCharacter } from 'test-helpers/fakeCharacters';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('CharacterAPI', () => {
	let CharacterAPI: any;

	beforeEach(() => {
		return import('../CharacterAPI').then(module => {
			CharacterAPI = module;
			jest.resetModules();
		});
	});

	describe('fetchAllCharacters', () => {
		it('should fetch all characters successfully', async () => {
			const fakeResponse = {
				results: [fakeCharacter],
				info: { count: 1 }
			};
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => fakeResponse
			});

			const filters: CharactersFilter = { name: '', status: '', species: '', type: '', gender: '' };
			const result = await CharacterAPI.fetchAllCharacters(filters, 1);

			expect(result).toEqual({ results: [fakeCharacter], totalCount: 1 });
			expect(mockFetch).toHaveBeenCalledWith(
				expect.stringContaining('https://rickandmortyapi.com/api/character'),
				expect.any(Object)
			);
		});

		it('should handle fetch error', async () => {
			jest.resetModules();
			global.fetch = mockFetch;
			mockFetch.mockClear();
			mockFetch.mockResolvedValueOnce({
				ok: false,
				json: async () => ({ error: 'Failed to fetch characters' })
			});

			const filters: CharactersFilter = { name: '', status: '', species: '', type: '', gender: '' };

			await expect(CharacterAPI.fetchAllCharacters(filters, 1)).rejects.toThrow('Failed to fetch characters');
		});
	});

	describe('fetchCharacterById', () => {
		it('should fetch character by id successfully', async () => {
			jest.resetModules();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => fakeCharacter
			});

			const result = await CharacterAPI.fetchCharacterById(1);

			expect(result).toEqual(fakeCharacter);
			expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
		});

		it('should handle fetch error', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				json: async () => ({ error: 'Character not found' })
			});

			await expect(CharacterAPI.fetchCharacterById(1)).rejects.toThrow('Character not found');
		});
	});
});
