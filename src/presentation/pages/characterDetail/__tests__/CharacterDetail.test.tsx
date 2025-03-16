import { render, screen } from '@testing-library/react';
import { useCharacterDetail } from 'presentation/hooks/useCharacterDetail';
import CharacterDetail from '../CharacterDetail';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { fakeCharacter } from 'test-helpers/fakeCharacters';

jest.mock('presentation/hooks/useCharacterDetail');
const mockedUseCharacterDetail = useCharacterDetail as jest.MockedFunction<typeof useCharacterDetail>;

describe('CharacterDetail', () => {
	beforeEach(() => {
		mockedUseCharacterDetail.mockClear();
	});

	test('should display loading state initially', () => {
		mockedUseCharacterDetail.mockReturnValue({ character: null, loading: true, error: null });

		render(
			<MemoryRouter initialEntries={['/character/1']}>
				<Routes>
					<Route path="/character/:id" element={<CharacterDetail />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
	});

	test('should display character details when data is fetched successfully', async () => {
		mockedUseCharacterDetail.mockReturnValue({ character: fakeCharacter, loading: false, error: null });

		render(
			<MemoryRouter initialEntries={['/character/1']}>
				<Routes>
					<Route path="/character/:id" element={<CharacterDetail />} />
				</Routes>
			</MemoryRouter>
		);

		await screen.findByText(/Rick Sanchez/i);
		expect(screen.getByText(/Alive/i)).toBeInTheDocument();
		expect(screen.getByText(/Human/i)).toBeInTheDocument();
		expect(screen.getByText(/Male/i)).toBeInTheDocument();
		expect(screen.getByText(/Earth/i)).toBeInTheDocument();
	});

	test('should display error message when there is an error', async () => {
		mockedUseCharacterDetail.mockReturnValue({ character: null, loading: false, error: 'Character not found' });

		render(
			<MemoryRouter initialEntries={['/character/1']}>
				<Routes>
					<Route path="/character/:id" element={<CharacterDetail />} />
				</Routes>
			</MemoryRouter>
		);

		await screen.findByText(/Character not found/i);
	});

	test('should display error message when character is not found', async () => {
		mockedUseCharacterDetail.mockReturnValue({ character: null, loading: false, error: null });

		render(
			<MemoryRouter initialEntries={['/character/1']}>
				<Routes>
					<Route path="/character/:id" element={<CharacterDetail />} />
				</Routes>
			</MemoryRouter>
		);

		await screen.findByText(/Character not found/i);
	});
});
