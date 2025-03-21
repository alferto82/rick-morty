import React, { useCallback } from 'react';
import {
	StyledFilterSection,
	StyledInput,
	StyledOrderGroup,
	StyledLabel,
	StyledOrderRow,
	StyledSelect,
	StyledFilterGroup,
	StyledAdditionalFilterRow
} from './FilterControls.styles';
import { Character } from 'domain/entities/Character';
import { CharactersFilter } from 'domain/usecases/GetCharacters';

interface FilterControlsProps {
	filters: CharactersFilter;
	orderField: keyof Character;
	orderDirection: 'asc' | 'desc';
	onFilterChange: (newFilters: CharactersFilter) => void;
	onOrderFieldChange: (field: keyof Character) => void;
	onOrderDirectionChange: (direction: 'asc' | 'desc') => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
	filters,
	orderField,
	orderDirection,
	onFilterChange,
	onOrderFieldChange,
	onOrderDirectionChange
}) => {
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onFilterChange({ ...filters, name: e.target.value });
		},
		[filters, onFilterChange]
	);

	const handleAdditionalFilterChange = useCallback(
		(key: keyof CharactersFilter, value: string) => {
			onFilterChange({
				...filters,
				[key]: value === 'all' ? undefined : value
			});
		},
		[filters, onFilterChange]
	);

	return (
		<StyledFilterSection>
			<StyledInput
				type="text"
				placeholder="Search by name..."
				value={filters.name || ''}
				onChange={handleInputChange}
				aria-label="Search by name"
			/>
			<StyledOrderGroup>
				<StyledLabel>Order</StyledLabel>
				<StyledOrderRow>
					<StyledSelect
						value={orderField}
						onChange={e => onOrderFieldChange(e.target.value as keyof Character)}
						aria-label="Order field"
					>
						<option value="name">Name</option>
						<option value="status">Status</option>
						<option value="species">Specie</option>
						<option value="gender">Gender</option>
					</StyledSelect>
					<StyledSelect
						value={orderDirection}
						onChange={e => onOrderDirectionChange(e.target.value as 'asc' | 'desc')}
						aria-label="Order direction"
					>
						<option value="asc">Ascending order</option>
						<option value="desc">Descending order</option>
					</StyledSelect>
				</StyledOrderRow>
			</StyledOrderGroup>
			<StyledFilterGroup>
				<StyledLabel>Filters</StyledLabel>
				<StyledAdditionalFilterRow>
					<StyledSelect
						value={filters.status || 'all'}
						onChange={e => handleAdditionalFilterChange('status', e.target.value)}
						aria-label="Filter status"
					>
						<option value="all">All Status</option>
						<option value="Alive">Alive</option>
						<option value="Dead">Dead</option>
						<option value="unknown">Unknown</option>
					</StyledSelect>
					<StyledSelect
						value={filters.species || 'all'}
						onChange={e => handleAdditionalFilterChange('species', e.target.value)}
						aria-label="Filter species"
					>
						<option value="all">All Species</option>
						<option value="Human">Human</option>
						<option value="Humanoid">Humanoid</option>
						<option value="Alien">Alien</option>
						<option value="Poopybutthole">Poopybutthole</option>
						<option value="Mythological Creature">Mythological Creature</option>
						<option value="Robot">Robot</option>
						<option value="Cronenberg">Cronenberg</option>
						<option value="Disease">Disease</option>
						<option value="unknow">unknow</option>
					</StyledSelect>
					<StyledSelect
						value={filters.gender || 'all'}
						onChange={e => handleAdditionalFilterChange('gender', e.target.value)}
						aria-label="Filter gender"
					>
						<option value="all">All Genders</option>
						<option value="Female">Female</option>
						<option value="Male">Male</option>
						<option value="Genderless">Genderless</option>
						<option value="unknown">Unknown</option>
					</StyledSelect>
				</StyledAdditionalFilterRow>
			</StyledFilterGroup>
		</StyledFilterSection>
	);
};

export default React.memo(FilterControls);
