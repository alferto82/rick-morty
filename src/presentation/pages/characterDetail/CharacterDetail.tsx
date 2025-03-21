import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacterDetail } from 'presentation/hooks/useCharacterDetail';
import ErrorMessage from 'presentation/components/ErrorMessage';
import {
	DetailContainer,
	DetailTitle,
	InfoContainer,
	ImageContainer,
	DetailImage,
	InfoDetails,
	DetailInfo,
	DetailLabel,
	BackButton
} from './CharacterDetail.styles';
import LoadingIndicator from 'presentation/components/LoadingIndicator';

const CharacterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const numericId = id ? Number(id) : 0;

	const { character, loading, error } = useCharacterDetail(numericId);

	if (loading) return <LoadingIndicator />;
	if (error) return <ErrorMessage message={error} showBack />;
	if (!character) return <ErrorMessage message={'Character not found'} showBack />;

	return (
		<DetailContainer>
			<BackButton onClick={() => navigate('/')}>Back</BackButton>
			<DetailTitle>{character.name}</DetailTitle>
			<InfoContainer>
				<ImageContainer>
					<DetailImage src={character.image} alt={character.name} />
				</ImageContainer>
				<InfoDetails>
					<DetailInfo>
						<DetailLabel>Status:</DetailLabel> {character.status}
					</DetailInfo>
					<DetailInfo>
						<DetailLabel>Species:</DetailLabel> {character.species}
					</DetailInfo>
					<DetailInfo>
						<DetailLabel>Gender:</DetailLabel> {character.gender}
					</DetailInfo>
					<DetailInfo>
						<DetailLabel>Origin:</DetailLabel> {character.origin.name}
					</DetailInfo>
					<DetailInfo>
						<DetailLabel>Location:</DetailLabel> {character.location.name}
					</DetailInfo>
				</InfoDetails>
			</InfoContainer>
		</DetailContainer>
	);
};

export default React.memo(CharacterDetail);
