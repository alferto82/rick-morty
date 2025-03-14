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
		<StyledButton onClick={onPrev} disabled={currentPage === 1}>
			Prev
		</StyledButton>
		<span>
			Page {currentPage} of {totalPages}
		</span>
		<StyledButton onClick={onNext} disabled={currentPage === totalPages}>
			Next
		</StyledButton>
	</StyledPagination>
);

export default React.memo(Pagination);
