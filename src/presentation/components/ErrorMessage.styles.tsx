import styled from 'styled-components';
import { borderRadius, colors, spacing, fontSizes } from 'styles/theme';

export const ErrorContainer = styled.div`
	border: 1px solid ${colors.error};
	padding: ${spacing.margin};
	margin: ${spacing.margin} 0;
	border-radius: ${borderRadius.small};
	background-color: ${colors.errorBackground};
	color: ${colors.error};
	text-align: center;
`;

export const ErrorText = styled.p`
	margin: 0;
	font-size: ${fontSizes.medium};
`;

export const BackButtonContainer = styled.div`
	display: flex;
	gap: ${spacing.gapSmall};
	justify-content: center;
	margin-top: ${spacing.gapSmall};
`;
