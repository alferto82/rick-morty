import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator', () => {
	test('should render loading indicator', () => {
		render(<LoadingIndicator />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
	});
});
