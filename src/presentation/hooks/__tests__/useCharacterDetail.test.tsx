import { render, screen } from '@testing-library/react';
import { Character } from 'domain/entities/Character';
import { getCharacter } from 'domain/usecases/GetCharacter';
import { useCharacterDetail } from '../useCharacterDetail';
import LoadingIndicator from 'presentation/components/LoadingIndicator';

jest.mock('domain/usecases/GetCharacter');
const mockedGetCharacter = getCharacter as jest.MockedFunction<typeof getCharacter>;

interface TestComponentProps {
	id: number;
}

const TestComponent: React.FC<TestComponentProps> = ({ id }) => {
	const { character, loading, error } = useCharacterDetail(id);

	if (loading) return <LoadingIndicator />;
	if (error) return <div>{error}</div>;
	if (character) return <div>{character.name}</div>;

	return null;
};
describe('useCharacterDetail', () => {
	const fakeCharacter: Character = {
		id: 1,
		name: 'Rick Sanchez',
		status: 'Alive',
		species: 'Human',
		type: '',
		gender: 'Male',
		origin: { name: 'Earth' },
		location: { name: 'Earth' },
		image: ''
	};

	beforeEach(() => {
		mockedGetCharacter.mockClear();
	});

	test('should fetch character detail successfully', async () => {
		mockedGetCharacter.mockResolvedValueOnce(fakeCharacter);

		render(<TestComponent id={1} />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

		await screen.findByText(/Rick Sanchez/i);
		expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
	});

	test('should handle error when fetching character detail', async () => {
		mockedGetCharacter.mockRejectedValueOnce(new Error('Character not found'));

		render(<TestComponent id={1} />);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

		await screen.findByText(/Character not found/i);
	});
});
