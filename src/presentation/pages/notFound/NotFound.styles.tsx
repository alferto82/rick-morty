import styled from 'styled-components';
import { rem } from 'polished';
import { colors, spacing, fontSizes, borderRadius } from 'styles/theme';

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

export const StyledButton = styled.button`
	padding: ${spacing.gapSmall} ${rem(15)};
	background-color: ${colors.primary};
	color: ${colors.background};
	border: none;
	border-radius: ${borderRadius.small};
	cursor: pointer;
	font-size: ${fontSizes.small};
	transition: background-color 0.3s;
	&:hover {
		background-color: ${colors.primaryDark};
	}
`;
