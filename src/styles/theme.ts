import { rem, darken } from 'polished';

export const colors = {
	primary: '#5BD24F',
	primaryDark: darken(0.2, '#5BD24F'),
	secondary: '#CCC',
	text: '#555',
	textSecondary: '#FFF'
};

export const spacing = {
	containerPadding: rem(20),
	gapSmall: rem(10),
	gapMedium: rem(15),
	margin: rem(20)
};

export const fontSizes = {
	small: rem(14),
	medium: rem(16),
	large: rem(24)
};

export const borderRadius = {
	small: rem(4)
};
