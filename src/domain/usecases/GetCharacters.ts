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
const PAGE_SIZE = 20;

const compareByKey = <T>(key: keyof T, direction: 'asc' | 'desc' = 'asc'): ((a: T, b: T) => number) => {
	return (a: T, b: T): number => {
		const aVal = a[key];
		const bVal = b[key];

		if (aVal == null && bVal == null) return 0;
		if (aVal == null) return direction === 'desc' ? 1 : -1;
		if (bVal == null) return direction === 'desc' ? -1 : 1;

		if (aVal < bVal) return direction === 'desc' ? 1 : -1;
		if (aVal > bVal) return direction === 'desc' ? -1 : 1;
		return 0;
	};
};

export const getCharacters = async (
	repository: CharacterRepository,
	filter?: CharactersFilter,
	order?: CharactersOrder,
	page: number = 1,
	signal?: AbortSignal
): Promise<CharactersResult> => {
	const { results, totalCount } = await repository.getAll(filter, page, signal);

	if (order?.orderBy) {
		results.sort(compareByKey<Character>(order.orderBy, order.direction || 'asc'));
	}

	const totalPages = Math.ceil(totalCount / PAGE_SIZE);
	return { results, totalCount, totalPages };
};
