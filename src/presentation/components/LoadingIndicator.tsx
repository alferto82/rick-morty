import React from 'react';
import { LoadingContainer, Spinner } from './LoadingIndicator.styles';

const LoadingIndicator: React.FC = () => {
	return (
		<LoadingContainer>
			<Spinner />
		</LoadingContainer>
	);
};

export default LoadingIndicator;
