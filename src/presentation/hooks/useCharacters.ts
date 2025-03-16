import { useState, useEffect, useMemo } from 'react';
import { characterRepositoryImpl } from 'data/repositories/CharacterRepositoryImpl';
import { CharactersFilter, CharactersOrder, CharactersResult, getCharacters } from 'domain/usecases/GetCharacters';

interface UseCharactersProps {
	filters: CharactersFilter;
	order: CharactersOrder;
	currentPage: number;
	pageSize?: number;
}

interface UseCharactersReturn {
	data: CharactersResult | null;
	loading: boolean;
	error: string | null;
}

export const useCharacters = ({ filters, order, currentPage }: UseCharactersProps): UseCharactersReturn => {
	const [data, setData] = useState<CharactersResult | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const memoizedFilters = useMemo(
		() => ({
			name: filters.name,
			status: filters.status,
			species: filters.species,
			type: filters.type,
			gender: filters.gender
		}),
		[filters.name, filters.status, filters.species, filters.type, filters.gender]
	);

	const memoizedOrder = useMemo(
		() => ({
			orderBy: order.orderBy,
			direction: order.direction
		}),
		[order.orderBy, order.direction]
	);

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const result = await getCharacters(
					characterRepositoryImpl,
					memoizedFilters,
					memoizedOrder,
					currentPage,
					controller.signal
				);
				setData(result);
			} catch (err: any) {
				if (err.name !== 'AbortError') {
					setError('No characters found');
					setData(null);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [memoizedFilters, memoizedOrder, currentPage]);

	return { data, loading, error };
};
