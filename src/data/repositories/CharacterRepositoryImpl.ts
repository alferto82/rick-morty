import { CharactersFilter } from '../../domain/usecases/GetCharacters';
import { fetchAllCharacters, fetchCharacterById } from '../datasources/CharacterAPI';
import { CharacterRepository } from './CharacterRepository';

export const characterRepositoryImpl: CharacterRepository = {
	getAll: async (filter?: CharactersFilter, page: number = 1, pageSize: number = 20, signal?: AbortSignal) =>
		fetchAllCharacters(filter, page, pageSize, signal),

	getById: async (id: number) => fetchCharacterById(id)
};
