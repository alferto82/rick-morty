import { Character } from '../../domain/entities/Character';
import { CharactersFilter } from '../../domain/usecases/GetCharacters';

export interface CharacterRepository {
	getAll(
		filter?: CharactersFilter,
		page?: number,
		pageSize?: number,
		signal?: AbortSignal
	): Promise<{ results: Character[]; totalCount: number }>;
}
