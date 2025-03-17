import React from 'react';
import { Character } from 'domain/entities/Character';
import { CardContainer, CardImage, CardContent, CardTitle, CardText } from './CharacterCard.styles';

interface CharacterCardProps {
	character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
	return (
		<CardContainer
			className="character-card"
			to={`/character/${character.id}`}
			aria-label={`View details for ${character.name}`}
		>
			<CardImage src={character.image} alt={`Image of ${character.name}`} />
			<CardContent>
				<CardTitle>{character.name}</CardTitle>
				<CardText>
					{character.status} - {character.species}
				</CardText>
			</CardContent>
		</CardContainer>
	);
};

export default React.memo(CharacterCard);
