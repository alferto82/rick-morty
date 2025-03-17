import React, { useState, useCallback } from 'react';
import { Character } from 'domain/entities/Character';
import CharacterCard from 'presentation/components/CharacterCard';
import { useCharacters } from 'presentation/hooks/useCharacters';
import { CharactersFilter } from 'domain/usecases/GetCharacters';
import ErrorMessage from 'presentation/components/ErrorMessage';
import { StyledContainer, StyledTitle, StyledCardGrid } from './CharacterList.styles';
import Pagination from 'presentation/components/Pagination';
import FilterControls from 'presentation/components/FilterControls';
import LoadingIndicator from 'presentation/components/LoadingIndicator';

const CharacterList: React.FC = () => {
	const [filters, setFilters] = useState<CharactersFilter>({});
	const [orderField, setOrderField] = useState<keyof Character>('name');
	const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data, loading, error } = useCharacters({
		filters,
		order: { orderBy: orderField, direction: orderDirection },
		currentPage
	});

	const totalPages = data?.totalPages || 1;
	const characters = data?.results || [];

	const handlePrevPage = useCallback(() => {
		if (currentPage > 1) setCurrentPage(prev => prev - 1);
	}, [currentPage]);

	const handleNextPage = useCallback(() => {
		if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
	}, [currentPage, totalPages]);

	const handleFilterChange = useCallback((newFilters: CharactersFilter) => {
		setFilters(newFilters);
		setCurrentPage(1);
	}, []);

	const handleOrderFieldChange = useCallback((field: keyof Character) => {
		setOrderField(field);
		setCurrentPage(1);
	}, []);

	const handleOrderDirectionChange = useCallback((direction: 'asc' | 'desc') => {
		setOrderDirection(direction);
		setCurrentPage(1);
	}, []);

	return (
		<StyledContainer>
			<StyledTitle>Rick and Morty Characters</StyledTitle>
			<FilterControls
				filters={filters}
				orderField={orderField}
				orderDirection={orderDirection}
				onFilterChange={handleFilterChange}
				onOrderFieldChange={handleOrderFieldChange}
				onOrderDirectionChange={handleOrderDirectionChange}
			/>

			{!loading && !error && characters.length > 0 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPrev={handlePrevPage}
					onNext={handleNextPage}
				/>
			)}

			{loading && <LoadingIndicator />}
			{error && <ErrorMessage message={error} />}

			{!loading && (
				<StyledCardGrid aria-live="polite">
					{characters.map(character => (
						<CharacterCard key={character.id} character={character} />
					))}
				</StyledCardGrid>
			)}

			{!loading && !error && characters.length > 0 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPrev={handlePrevPage}
					onNext={handleNextPage}
				/>
			)}
		</StyledContainer>
	);
};

export default CharacterList;
