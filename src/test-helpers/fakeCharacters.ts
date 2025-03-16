import { Character } from 'domain/entities/Character';
import { CharactersResult } from 'domain/usecases/GetCharacters';

export const fakeCharacter: Character = {
	id: 1,
	name: 'Rick Sanchez',
	status: 'Alive',
	species: 'Human',
	type: '',
	gender: 'Male',
	origin: { name: 'Earth' },
	location: { name: 'Another place' },
	image: 'rick.png'
};

export const fakeCharacters: Character[] = [
	{
		id: 1,
		name: 'Rick Sanchez',
		status: 'Alive',
		species: 'Human',
		type: '',
		gender: 'Male',
		origin: { name: 'Earth' },
		location: { name: 'Another place' },
		image: ''
	},
	{
		id: 2,
		name: 'Morty Smith',
		status: 'Alive',
		species: 'Human',
		type: '',
		gender: 'Male',
		origin: { name: 'Earth' },
		location: { name: 'Another place' },
		image: ''
	}
];

export const fakeCharactersResult: CharactersResult = {
	results: fakeCharacters,
	totalCount: 2,
	totalPages: 1
};
