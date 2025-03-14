import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './presentation/pages/characterList/CharacterList';
import { GlobalStyle } from './styles/GlobalStyles';
import CharacterDetails from './presentation/pages/characterDetail/CharacterDetail';

const App: React.FC = () => {
	// This assignment is necessary to avoid a type error
	// when using the GlobalStyle component. This error is caused due to version 18 of react and styled-components 5.
	const GlobalStyleProxy: any = GlobalStyle;
	return (
		<Router>
			<GlobalStyleProxy />
			<Routes>
				<Route path="/" element={<CharacterList />} />
				<Route path="/character/:id" element={<CharacterDetails />} />
			</Routes>
		</Router>
	);
};

export default App;
