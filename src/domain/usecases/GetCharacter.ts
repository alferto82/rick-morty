import { CharacterRepository } from '../../data/repositories/CharacterRepository';
import { Character } from '../entities/Character';

export const getCharacter = async (repository: CharacterRepository, id: number): Promise<Character> => {
	return repository.getById(id);
};
