import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Message } from './NotFound.styles';

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Title>404 - Page not found</Title>
			<Message>Sorry, this page does not exist..</Message>
			<button onClick={() => navigate('/')}>Back to home</button>
		</Container>
	);
};

export default NotFoundPage;
