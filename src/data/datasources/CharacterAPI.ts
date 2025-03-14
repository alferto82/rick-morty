import { Character } from '../../domain/entities/Character';
import { CharactersFilter } from '../../domain/usecases/GetCharacters';

const API_PAGE_SIZE = 20;
const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchAllCharacters = async (
	filters?: CharactersFilter,
	page: number = 1,
	pageSize: number = 20,
	signal?: AbortSignal
): Promise<{ results: Character[]; totalCount: number }> => {
	if (pageSize === API_PAGE_SIZE) {
		const queryParams = new URLSearchParams();
		queryParams.append('page', String(page));
		if (filters?.name) queryParams.append('name', filters.name);
		if (filters?.status) queryParams.append('status', filters.status);
		if (filters?.species) queryParams.append('species', filters.species);
		if (filters?.type) queryParams.append('type', filters.type);
		if (filters?.gender) queryParams.append('gender', filters.gender);

		const url = BASE_URL + '?' + queryParams.toString();
		const response = await fetch(url, { signal });
		const data = await response.json();
		return { results: data.results, totalCount: data.info.count };
	} else {
		const startIndex = (page - 1) * pageSize;
		const endIndex = page * pageSize - 1;
		const apiStartPage = Math.floor(startIndex / API_PAGE_SIZE) + 1;
		const apiEndPage = Math.ceil((endIndex + 1) / API_PAGE_SIZE);
		let combinedResults: Character[] = [];
		let totalCount = 0;

		for (let apiPage = apiStartPage; apiPage <= apiEndPage; apiPage++) {
			const queryParams = new URLSearchParams();
			queryParams.append('page', String(apiPage));
			if (filters?.name) queryParams.append('name', filters.name);
			if (filters?.status) queryParams.append('status', filters.status);
			if (filters?.species) queryParams.append('species', filters.species);
			if (filters?.type) queryParams.append('type', filters.type);
			if (filters?.gender) queryParams.append('gender', filters.gender);

			const url = BASE_URL + '?' + queryParams.toString();
			const response = await fetch(url, { signal });
			const data = await response.json();
			if (apiPage === apiStartPage) {
				totalCount = data.info.count;
			}
			combinedResults = combinedResults.concat(data.results);
		}

		const localStart = startIndex - (apiStartPage - 1) * API_PAGE_SIZE;
		const paginatedResults = combinedResults.slice(localStart, localStart + pageSize);
		return { results: paginatedResults, totalCount };
	}
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
	const url = `${BASE_URL}/${id}`;
	const response = await fetch(url);
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || 'Character not found');
	}
	return response.json();
};
