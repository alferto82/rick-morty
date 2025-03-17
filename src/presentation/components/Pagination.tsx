import React from 'react';
import { StyledButton, StyledPagination } from './Pagination.styles';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPrev: () => void;
	onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => (
	<StyledPagination>
		<StyledButton onClick={onPrev} disabled={currentPage === 1} aria-label="Go to previous page">
			Prev
		</StyledButton>
		<span aria-live="polite">
			Page {currentPage} of {totalPages}
		</span>
		<StyledButton onClick={onNext} disabled={currentPage === totalPages} aria-label="Go to next page">
			Next
		</StyledButton>
	</StyledPagination>
);

export default React.memo(Pagination);
