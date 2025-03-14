// src/presentation/pages/CharacterList.tsx
import React, { useState } from 'react';
import { Character } from '../../domain/entities/Character';
import CharacterCard from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';
import { CharactersFilter } from '../../domain/usecases/GetCharacters';
import ErrorMessage from '../components/ErrorMessage';

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

	const containerStyle = {
		padding: '20px',
		fontFamily: "'Inter', sans-serif",
		margin: '0 auto'
	};

	const titleStyle = {
		color: '#0a5beb',
		fontFamily: "'Poppins', sans-serif",
		textAlign: 'center' as const,
		marginBottom: '20px'
	};

	const filterSectionStyle = {
		marginBottom: '20px',
		display: 'flex',
		gap: '10px',
		flexWrap: 'wrap' as const,
		justifyContent: 'center'
	};

	const inputStyle = {
		padding: '10px',
		border: '1px solid #ccc',
		borderRadius: '4px',
		fontSize: '14px'
	};

	const selectStyle = {
		padding: '10px',
		border: '1px solid #ccc',
		borderRadius: '4px',
		fontSize: '14px'
	};

	const cardGridStyle = {
		display: 'flex',
		flexWrap: 'wrap' as const,
		gap: '15px',
		justifyContent: 'center'
	};

	const paginationStyle = {
		marginTop: '20px',
		display: 'flex',
		justifyContent: 'center',
		gap: '10px',
		alignItems: 'center'
	};

	const buttonStyle = {
		padding: '10px 15px',
		backgroundColor: '#0a5beb',
		color: '#fff',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		fontSize: '14px',
		transition: 'background-color 0.3s'
	};

	const disabledButtonStyle = {
		...buttonStyle,
		backgroundColor: '#ccc',
		cursor: 'not-allowed'
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(prev => prev - 1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
	};

	return (
		<div style={containerStyle}>
			<h1 style={titleStyle}>Rick and Morty Characters</h1>
			<div style={filterSectionStyle}>
				<input
					type="text"
					placeholder="Search by name..."
					value={filters.name || ''}
					onChange={e => setFilters(prev => ({ ...prev, name: e.target.value }))}
					style={inputStyle}
				/>
				<select
					value={orderField}
					onChange={e => setOrderField(e.target.value as keyof Character)}
					style={selectStyle}
				>
					<option value="name">Name</option>
					<option value="status">Status</option>
					<option value="species">Specie</option>
					<option value="gender">Gender</option>
				</select>
				<select
					value={orderDirection}
					onChange={e => setOrderDirection(e.target.value as 'asc' | 'desc')}
					style={selectStyle}
				>
					<option value="asc">Ascending order</option>
					<option value="desc">Descending Order</option>
				</select>
			</div>

			{loading && <div>Loading...</div>}
			{error && <ErrorMessage message={error} />}

			<div style={cardGridStyle}>
				{characters.map(character => (
					<CharacterCard key={character.id} character={character} />
				))}
			</div>

			<div style={paginationStyle}>
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
				>
					Prev
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default CharacterList;
