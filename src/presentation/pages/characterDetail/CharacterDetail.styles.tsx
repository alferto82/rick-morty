import styled from 'styled-components';
import { rem } from 'polished';

export const DetailContainer = styled.div`
	padding: ${rem(20)};
	max-width: ${rem(700)};
	margin: 0 auto;
	font-family: 'Inter', sans-serif;
`;

export const DetailTitle = styled.h1`
	color: #0a5beb;
	text-align: center;
	margin-bottom: ${rem(20)};
	font-family: 'Poppins', sans-serif;
`;

export const InfoContainer = styled.div`
	display: flex;
	gap: ${rem(20)};
	align-items: flex-start;
	flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
	flex: 0 0 auto;
	max-width: ${rem(250)};
`;

export const DetailImage = styled.img`
	width: 100%;
	height: auto;
	border-radius: ${rem(4)};
`;

export const InfoDetails = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};
`;

export const DetailInfo = styled.p`
	font-size: ${rem(14)};
	color: #555;
	margin: 0;
`;

export const DetailLabel = styled.span`
	font-weight: bold;
`;

export const BackButton = styled.button`
	padding: ${rem(10)} ${rem(15)};
	background-color: #0a5beb;
	color: #fff;
	border: none;
	border-radius: ${rem(4)};
	cursor: pointer;
	font-size: ${rem(14)};
	transition: background-color 0.3s;
	margin-bottom: ${rem(20)};
	&:hover {
		background-color: #004f9e;
	}
`;
