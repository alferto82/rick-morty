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

export const StyledFilterSection = styled.div`
	margin-bottom: ${spacing.margin};
	display: flex;
	flex-direction: column;
	gap: ${spacing.gapSmall};
	align-items: center;
`;

export const StyledInput = styled.input`
	padding: ${spacing.gapSmall};
	border: 1px solid ${colors.secondary};
	border-radius: ${borderRadius.small};
	font-size: ${fontSizes.small};
	width: 100%;
	max-width: ${rem(300)};
`;

export const StyledOrderRow = styled.div`
	display: flex;
	gap: ${spacing.gapSmall};
	justify-content: center;
	width: 100%;
	max-width: ${rem(300)};
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
