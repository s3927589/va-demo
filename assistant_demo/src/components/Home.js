import React from 'react';
import TaskHandler from './TaskHandler'
import bg from '../images/car_iso.png'

const Home = () => {
	return (
		<div className="container home">
			<h4 className="blue-text text-darken-2">Hệ thống ô tô kỹ thuật số</h4>
			<h5>Trợ lý ảo  thông minh</h5>
			<br/>
			<img src={bg} width="500" alt="bg" />
			<TaskHandler />
		</div>
	)
}

export default Home
