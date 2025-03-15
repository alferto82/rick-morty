import { useState, useEffect } from 'react';
import { Character } from '../../domain/entities/Character';
import { characterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl';
import { getCharacter } from '../../domain/usecases/GetCharacter';

export const useCharacterDetail = (id: number) => {
	const [character, setCharacter] = useState<Character | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDetail = async () => {
			try {
				const data = await getCharacter(characterRepositoryImpl, id);
				setCharacter(data);
			} catch (err) {
				setError('Character not found');
			} finally {
				setLoading(false);
			}
		};

		fetchDetail();
	}, [id]);

	return { character, loading, error };
};
