import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import NavBar from './components/NavBar'
import Car from './components/Car'
import ChatBot from './components/ChatBot'
import Browse from './components/Browse'
import MyCars from './components/MyCars'

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<NavBar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/browse' element={<Browse />}/>
					<Route path='/my-cars' element={<MyCars />}/>
					<Route path='/:id' element={<Car />}/>
				</Routes>
				<ChatBot />
			</div>
		</BrowserRouter>
	);
}

export default App
