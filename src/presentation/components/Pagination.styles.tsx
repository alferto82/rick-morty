import styled from 'styled-components';
import { rem } from 'polished';
import { borderRadius, spacing, colors, fontSizes } from '../../styles/theme';

export const StyledPagination = styled.div`
	margin-top: ${spacing.margin};
	margin-bottom: ${spacing.margin};
	display: flex;
	justify-content: center;
	gap: ${spacing.gapSmall};
	align-items: center;
`;

export const StyledButton = styled.button`
	padding: ${spacing.gapSmall} ${rem(15)};
	background-color: ${colors.primary};
	color: ${colors.text};
	border: none;
	border-radius: ${borderRadius.small};
	cursor: pointer;
	font-size: ${fontSizes.small};
	transition: background-color 0.3s;
	&:disabled {
		background-color: ${colors.secondary};
		cursor: not-allowed;
	}
`;
