import styled from 'styled-components';
import { borderRadius, spacing, colors, fontSizes } from '../../../styles/theme';

export const StyledContainer = styled.div`
	padding: ${spacing.containerPadding};
	margin: 0 auto;
`;

export const StyledTitle = styled.h1`
	color: ${colors.primary};
	text-align: center;
	margin-bottom: ${spacing.margin};
`;

export const StyledFilterSection = styled.div`
	margin-bottom: ${spacing.margin};
	display: flex;
	gap: ${spacing.gapSmall};
	flex-wrap: wrap;
	justify-content: center;
`;

export const StyledInput = styled.input`
	padding: ${spacing.gapSmall};
	border: 1px solid ${colors.secondary};
	border-radius: ${borderRadius.small};
	font-size: ${fontSizes.small};
`;

export const StyledSelect = styled.select`
	padding: ${spacing.gapSmall};
	border: 1px solid ${colors.secondary};
	border-radius: ${borderRadius.small};
	font-size: ${fontSizes.small};
`;

export const StyledCardGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${spacing.gapMedium};
	justify-content: center;
`;
