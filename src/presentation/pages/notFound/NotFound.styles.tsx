import styled from 'styled-components';
import { colors, fontSizes, spacing } from '../../../styles/theme';

export const Container = styled.div`
	padding: ${spacing.containerPadding};
	text-align: center;
	font-family: 'Inter', sans-serif;
`;

export const Title = styled.h1`
	font-size: ${fontSizes.large};
	color: ${colors.primary};
	margin-bottom: ${spacing.gapSmall};
`;

export const Message = styled.p`
	font-size: ${fontSizes.medium};
	color: ${colors.text};
	margin-bottom: ${spacing.margin};
`;
