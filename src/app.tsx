import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from 'presentation/pages/characterList/CharacterList';
import { GlobalStyle } from 'styles/GlobalStyles';
import NotFoundPage from 'presentation/pages/notFound/NotFoundPage';
import LoadingIndicator from 'presentation/components/LoadingIndicator';

const App: React.FC = () => {
	// This assignment is necessary to avoid a type error
	// when using the GlobalStyle component. This error is caused due to version 18 of react and styled-components 5.
	const GlobalStyleProxy: any = GlobalStyle;

	const CharacterDetail = React.lazy(() => import('presentation/pages/characterDetail/CharacterDetail'));
	return (
		<Router>
			<Suspense fallback={<LoadingIndicator />}>
				<GlobalStyleProxy />
				<Routes>
					<Route path="/" element={<CharacterList />} />
					<Route path="/character/:id" element={<CharacterDetail />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
