import styled from 'styled-components';
import { rem } from 'polished';
import { borderRadius, spacing, colors, fontSizes } from '../../styles/theme';

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

export const StyledOrderGroup = styled.div`
	display: flex;
	align-items: center;
	gap: ${spacing.gapSmall};
	width: 100%;
	max-width: ${rem(300)};
`;

export const StyledOrderRow = styled.div`
	display: flex;
	gap: ${spacing.gapSmall};
`;

export const StyledFilterGroup = styled.div`
	display: flex;
	align-items: center;
	gap: ${spacing.gapSmall};
	width: 100%;
	max-width: ${rem(300)};
`;

export const StyledAdditionalFilterRow = styled.div`
	display: flex;
	gap: ${spacing.gapSmall};
`;

export const StyledLabel = styled.div`
	font-size: ${fontSizes.small};
	color: ${colors.primaryDark};
	font-weight: bold;
`;

export const StyledSelect = styled.select`
	padding: ${spacing.gapSmall};
	border: 1px solid ${colors.secondary};
	border-radius: ${borderRadius.small};
	font-size: ${fontSizes.small};
`;
