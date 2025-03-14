import { Character } from '../../domain/entities/Character';
import { CharactersFilter } from '../../domain/usecases/GetCharacters';
import { createInMemoryCacheService } from '../cache/inMemoryCacheService';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const listCache = createInMemoryCacheService<{ results: Character[]; totalCount: number }>();
const characterCache = createInMemoryCacheService<Character>();

const getListCacheKey = (filters?: CharactersFilter, page: number = 1): string => JSON.stringify({ filters, page });

export const fetchAllCharacters = async (
	filters?: CharactersFilter,
	page: number = 1,
	signal?: AbortSignal
): Promise<{ results: Character[]; totalCount: number }> => {
	const cacheKey = getListCacheKey(filters, page);
	if (listCache.has(cacheKey)) {
		return listCache.get(cacheKey)!;
	}

	const queryParams = new URLSearchParams();
	queryParams.append('page', String(page));
	if (filters?.name) queryParams.append('name', filters.name);
	if (filters?.status) queryParams.append('status', filters.status);
	if (filters?.species) queryParams.append('species', filters.species);
	if (filters?.type) queryParams.append('type', filters.type);
	if (filters?.gender) queryParams.append('gender', filters.gender);

	const url = BASE_URL + '?' + queryParams.toString();

	try {
		const response = await fetch(url, { signal });
		if (!response.ok) {
			throw new Error('Failed to fetch characters');
		}
		const data = await response.json();
		const result = { results: data.results, totalCount: data.info.count };

		listCache.set(cacheKey, result);
		result.results.forEach((character: Character) => {
			characterCache.set(String(character.id), character);
		});

		return result;
	} catch (error) {
		if ((error as Error).name === 'AbortError') {
			console.log('Fetch aborted');
		} else {
			console.error('Fetch error:', error);
		}
		throw error;
	}
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
	const cacheKey = String(id);
	if (characterCache.has(cacheKey)) {
		return characterCache.get(cacheKey)!;
	}

	const url = `${BASE_URL}/${id}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Character not found');
		}
		const character = await response.json();
		characterCache.set(cacheKey, character);
		return character;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
