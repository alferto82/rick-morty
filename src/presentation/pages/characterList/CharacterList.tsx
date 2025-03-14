import React, { useState } from 'react';
import { Character } from '../../../domain/entities/Character';
import CharacterCard from '../../components/CharacterCard';
import { useCharacters } from '../../hooks/useCharacters';
import { CharactersFilter } from '../../../domain/usecases/GetCharacters';
import ErrorMessage from '../../components/ErrorMessage';
import {
	StyledContainer,
	StyledTitle,
	StyledFilterSection,
	StyledInput,
	StyledSelect,
	StyledCardGrid
} from './CharacterList.styles';
import Pagination from '../../components/Pagination';

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
			<StyledFilterSection>
				<StyledInput
					type="text"
					placeholder="Search by name..."
					value={filters.name || ''}
					onChange={e => setFilters(prev => ({ ...prev, name: e.target.value }))}
				/>
				<StyledSelect value={orderField} onChange={e => setOrderField(e.target.value as keyof Character)}>
					<option value="name">Name</option>
					<option value="status">Status</option>
					<option value="species">Specie</option>
					<option value="gender">Gender</option>
				</StyledSelect>
				<StyledSelect
					value={orderDirection}
					onChange={e => setOrderDirection(e.target.value as 'asc' | 'desc')}
				>
					<option value="asc">Ascending order</option>
					<option value="desc">Descending order</option>
				</StyledSelect>
			</StyledFilterSection>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPrev={handlePrevPage}
				onNext={handleNextPage}
			/>

			{loading && <div>Loading...</div>}
			{error && <ErrorMessage message={error} />}

			<StyledCardGrid>
				{characters.map(character => (
					<CharacterCard key={character.id} character={character} />
				))}
			</StyledCardGrid>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPrev={handlePrevPage}
				onNext={handleNextPage}
			/>
		</StyledContainer>
	);
};

export default CharacterList;
