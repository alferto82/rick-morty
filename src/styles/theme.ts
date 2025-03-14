import { rem, lighten, darken } from 'polished';

export const colors = {
	primary: '#0a5beb',
	primaryLight: lighten(0.2, '#0a5beb'),
	primaryDark: darken(0.2, '#0a5beb'),
	secondary: '#ccc',
	text: '#fff'
};

export const spacing = {
	containerPadding: rem(20),
	gapSmall: rem(10),
	gapMedium: rem(15),
	margin: rem(20)
};

export const fontSizes = {
	small: rem(14)
};

export const borderRadius = {
	small: rem(4)
};
