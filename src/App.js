/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navar';
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='messages' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
