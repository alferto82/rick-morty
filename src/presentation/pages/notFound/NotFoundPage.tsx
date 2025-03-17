import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Message, StyledButton } from './NotFound.styles';

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	const handleBackToHome = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<Container role="alert">
			<Title>404 - Page not found</Title>
			<Message>Sorry, this page does not exist..</Message>
			<StyledButton onClick={handleBackToHome} aria-label="Back to home">
				Back to home
			</StyledButton>
		</Container>
	);
};

export default React.memo(NotFoundPage);
