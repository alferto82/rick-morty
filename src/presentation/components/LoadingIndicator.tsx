import React from 'react';
import { LoadingContainer, Spinner } from './LoadingIndicator.styles';

const LoadingIndicator: React.FC = () => {
	return (
		<LoadingContainer data-testid="loading-indicator">
			<Spinner />
		</LoadingContainer>
	);
};

export default React.memo(LoadingIndicator);
