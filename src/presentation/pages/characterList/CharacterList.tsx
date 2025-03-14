import React, { useState } from 'react';
import { Character } from '../../../domain/entities/Character';
import CharacterCard from '../../components/CharacterCard';
import { useCharacters } from '../../hooks/useCharacters';
import { CharactersFilter } from '../../../domain/usecases/GetCharacters';
import ErrorMessage from '../../components/ErrorMessage';
import { StyledContainer, StyledTitle, StyledCardGrid } from './CharacterList.styles';
import Pagination from '../../components/Pagination';
import FilterControls from '../../components/FilterControls';
import LoadingIndicator from '../../components/LoadingIndicator';

const CharacterList: React.FC = () => {
	const [filters, setFilters] = useState<CharactersFilter>({});
	const [orderField, setOrderField] = useState<keyof Character>('name');
	const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data, loading, error } = useCharacters({
		filters,
		order: { orderBy: orderField, direction: orderDirection },
		currentPage,
		pageSize: 20
	});

	const totalPages = data?.totalPages || 1;
	const characters = data?.results || [];

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(prev => prev - 1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
	};

	return (
		<StyledContainer>
			<StyledTitle>Rick and Morty Characters</StyledTitle>
			<FilterControls
				filters={filters}
				orderField={orderField}
				orderDirection={orderDirection}
				onFilterChange={newFilters => {
					setFilters(newFilters);
					setCurrentPage(1);
				}}
				onOrderFieldChange={field => {
					setOrderField(field);
					setCurrentPage(1);
				}}
				onOrderDirectionChange={direction => {
					setOrderDirection(direction);
					setCurrentPage(1);
				}}
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
				<StyledCardGrid>
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
