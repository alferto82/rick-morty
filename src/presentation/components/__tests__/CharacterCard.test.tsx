import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from '../CharacterCard';
import { fakeCharacter } from 'test-helpers/fakeCharacters';

describe('CharacterCard', () => {
	test('should display character details', () => {
		render(
			<MemoryRouter>
				<CharacterCard character={fakeCharacter} />
			</MemoryRouter>
		);

		expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
		expect(screen.getByText(/Alive - Human/i)).toBeInTheDocument();
		expect(screen.getByAltText(/Rick Sanchez/i)).toHaveAttribute('src', fakeCharacter.image);
	});

	test('should navigate to character detail page on click', () => {
		render(
			<MemoryRouter>
				<CharacterCard character={fakeCharacter} />
			</MemoryRouter>
		);

		const cardContainer = screen.getByRole('link');
		expect(cardContainer).toHaveAttribute('href', `/character/${fakeCharacter.id}`);
	});
});
