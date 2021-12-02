import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TaskHandler from './TaskHandler'

const Browse = ({ cars }) => {
	const carList = cars.length ? (
		cars.map(car => (
			<div className="post card" key={car.id}>
				<div className="card-content">
					<Link to={'/' + car.id}>
						<img src={car.img} width="200"/>
						<span className="card-title black-text">{car.title}</span>
					</Link>
				</div>
			</div>
		))
	) : (
		<div className="center">No cars yet</div>
	);
	return (
		<div className="my-container home">
			<h4 className="center blue-text text-darken-2">Danh sách ô tô</h4><br/>
			<div className="flex-row">
			{carList}
			</div>
			<TaskHandler />
		</div>
	)
}

Browse.propTypes = {
	cars: PropTypes.array,
}

// specify which one we want to receive
const mapStateToProps = (state) => ({
	cars: state.cars.cars,
})

export default connect(mapStateToProps)(Browse)
