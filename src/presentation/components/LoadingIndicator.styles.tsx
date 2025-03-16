import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';
import { colors } from 'styles/theme';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: ${rem(200)};
`;

export const Spinner = styled.div`
	border: ${rem(4)} solid ${colors.secondary};
	border-top: ${rem(4)} solid ${colors.primary};
	border-radius: 50%;
	width: ${rem(40)};
	height: ${rem(40)};
	animation: ${spin} 1s linear infinite;
`;
