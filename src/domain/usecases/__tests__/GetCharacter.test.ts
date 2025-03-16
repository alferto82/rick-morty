import { fakeCharacter } from 'test-helpers/fakeCharacters';
import { getCharacter } from '../GetCharacter';
import { CharacterRepository } from 'data/repositories/CharacterRepository';

describe('getCharacter', () => {
	let mockRepository: jest.Mocked<CharacterRepository>;

	beforeEach(() => {
		mockRepository = {
			getById: jest.fn()
		} as unknown as jest.Mocked<CharacterRepository>;
	});

	it('should fetch character by id successfully', async () => {
		mockRepository.getById.mockResolvedValueOnce(fakeCharacter);

		const result = await getCharacter(mockRepository, 1);

		expect(result).toEqual(fakeCharacter);
		expect(mockRepository.getById).toHaveBeenCalledWith(1);
	});

	it('should handle fetch error', async () => {
		mockRepository.getById.mockRejectedValueOnce(new Error('Character not found'));

		await expect(getCharacter(mockRepository, 1)).rejects.toThrow('Character not found');
	});
});
