// src/presentation/components/CharacterCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../../domain/entities/Character';

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
	return (
		<Link to={`/character/${character.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
			<div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', maxWidth: '300px' }}>
				<img
					src={character.image}
					alt={character.name}
					style={{ width: '100%', borderRadius: '4px', maxWidth: '300px' }}
				/>
				<h3>{character.name}</h3>
				<p>
					<strong>Gender:</strong> {character.gender}
				</p>
				<p>
					<strong>Status:</strong> {character.status}
				</p>
				<p>
					<strong>Species:</strong> {character.species}
				</p>
				<p>
					<strong>Type:</strong> {character.type}
				</p>
				<p>
					<strong>Gender:</strong> {character.gender}
				</p>
			</div>
		</Link>
	);
};

export default CharacterCard;
