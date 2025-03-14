import { Character } from '../../domain/entities/Character';
import { CharactersFilter } from '../../domain/usecases/GetCharacters';

export interface CharacterRepository {
	getAll(
		filter?: CharactersFilter,
		page?: number,
		signal?: AbortSignal
	): Promise<{ results: Character[]; totalCount: number }>;

	getById(id: number): Promise<Character>;
}
