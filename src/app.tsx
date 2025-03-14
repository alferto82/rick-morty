import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './presentation/pages/CharacterList';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<CharacterList />} />
			</Routes>
		</Router>
	);
};

export default App;
