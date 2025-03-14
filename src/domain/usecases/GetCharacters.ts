import { CharacterRepository } from '../../data/repositories/CharacterRepository';
import { Character } from '../entities/Character';

export interface CharactersFilter {
	name?: string;
	status?: string; // alive, dead o unknown
	species?: string;
	type?: string;
	gender?: string; // female, male, genderless o unknown
}

export interface CharactersOrder {
	orderBy?: keyof Character;
	direction?: 'asc' | 'desc';
}

export interface CharactersResult {
	results: Character[];
	totalCount: number;
	totalPages: number;
}

export const getCharacters = async (
	repository: CharacterRepository,
	filter?: CharactersFilter,
	order?: CharactersOrder,
	page: number = 1,
	pageSize: number = 20,
	signal?: AbortSignal
): Promise<CharactersResult> => {
	const { results, totalCount } = await repository.getAll(filter, page, pageSize, signal);

	if (order?.orderBy) {
		const orderKey = order.orderBy;
		results.sort((a, b) => {
			const aVal = a[orderKey];
			const bVal = b[orderKey];

			if (aVal === undefined && bVal === undefined) return 0;
			if (aVal === undefined) return order.direction === 'desc' ? 1 : -1;
			if (bVal === undefined) return order.direction === 'desc' ? -1 : 1;

			if (aVal < bVal) return order.direction === 'desc' ? 1 : -1;
			if (aVal > bVal) return order.direction === 'desc' ? -1 : 1;
			return 0;
		});
	}

	const totalPages = Math.ceil(totalCount / pageSize);
	return { results, totalCount, totalPages };
};
