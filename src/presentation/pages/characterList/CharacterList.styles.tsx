import styled from 'styled-components';
import { rem } from 'polished';
import { colors, spacing, fontSizes, borderRadius } from '../../../styles/theme';

export const StyledContainer = styled.div`
	padding: ${spacing.containerPadding};
	margin: 0 auto;
`;

export const StyledTitle = styled.h1`
	color: ${colors.primary};
	text-align: center;
	margin-bottom: ${spacing.margin};
`;

export const StyledCardGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${spacing.gapMedium};
	justify-content: center;
`;

export const StyledPagination = styled.div`
	margin-top: ${spacing.margin};
	display: flex;
	justify-content: center;
	gap: ${spacing.gapSmall};
	align-items: center;
`;

export const StyledButton = styled.button`
	padding: ${spacing.gapSmall} ${rem(15)};
	background-color: ${colors.primary};
	color: ${colors.background};
	border: none;
	border-radius: ${borderRadius.small};
	cursor: pointer;
	font-size: ${fontSizes.small};
	transition: box-shadow 0.3s;
	&:hover {
		box-shadow: 0 0 ${rem(10)} rgba(0, 0, 0, 0.2);
	}
	&:disabled {
		background-color: ${colors.secondary};
		cursor: not-allowed;
	}
`;
