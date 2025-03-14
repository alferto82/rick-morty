import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer, ErrorText, BackButtonContainer } from './ErrorMessage.styles';

interface ErrorMessageProps {
	message: string;
	showBack?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, showBack = false }) => {
	const navigate = useNavigate();

	return (
		<ErrorContainer>
			<ErrorText>{message}</ErrorText>
			{showBack && (
				<BackButtonContainer>
					<button onClick={() => navigate('/')}>Back to Home</button>
				</BackButtonContainer>
			)}
		</ErrorContainer>
	);
};

export default React.memo(ErrorMessage);
