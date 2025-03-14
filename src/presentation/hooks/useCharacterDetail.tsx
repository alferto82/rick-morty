import { useState, useEffect } from 'react';
import { Character } from '../../domain/entities/Character';
import { characterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl';
import { getCharacter } from '../../domain/usecases/GetCharacter';

export const useCharacterDetail = (id: number, signal?: AbortSignal) => {
	const [character, setCharacter] = useState<Character | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchDetail = async () => {
			try {
				const data = await getCharacter(characterRepositoryImpl, id);
				setCharacter(data);
			} catch (err: any) {
				if (err.name !== 'AbortError') {
					setError('Character not found');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchDetail();

		return () => {
			controller.abort();
		};
	}, [id]);

	return { character, loading, error };
};
