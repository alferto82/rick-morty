import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';
import { colors, spacing, fontSizes, borderRadius } from '../../styles/theme';

export const CardContainer = styled(Link)`
	display: block;
	width: ${rem(200)};
	border: 1px solid ${colors.secondary};
	border-radius: ${borderRadius.small};
	overflow: hidden;
	text-decoration: none;
	color: inherit;
	transition: box-shadow 0.3s;
	&:hover {
		box-shadow: 0 0 ${rem(10)} rgba(0, 0, 0, 0.2);
	}
`;

export const CardImage = styled.img`
	width: 100%;
	height: auto;
`;

export const CardContent = styled.div`
	padding: ${spacing.gapSmall};
`;

export const CardTitle = styled.h3`
	margin: 0 0 ${spacing.gapSmall} 0;
	font-size: ${rem(16)};
`;

export const CardText = styled.p`
	margin: 0;
	font-size: ${fontSizes.small};
	color: ${colors.text};
`;
