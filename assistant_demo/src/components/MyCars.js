import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TaskHandler from './TaskHandler'

const MyCars = ({ cars }) => {
	const carList = cars.length ? (
		cars.map(car => (
			<div className="post card" key={car.id}>
				<div className="card-content">
					<Link to={'/' + car.id} className="card-title">
						<img src={car.img} width="200"/>
						<span className="card-title green-text">{car.title}</span>
					</Link>
				</div>
			</div>
		))
	) : (
		<div className="center">Hiện chưa có xe trong kho của bạn. Hãy đến danh sách xe để chọn nhé.</div>
	);
	return (
		<div className="container">
			<h4 className="center blue-text text-darken-2">Kho xe của tôi</h4>
			<div className="flex-row">
				{carList}
			</div>
			<TaskHandler />
		</div>
	)
}

MyCars.propTypes = {
	cars: PropTypes.array,
}

// specify which one we want to receive
const mapStateToProps = (state) => ({
	cars: state.myCars.cars,
})

export default connect(mapStateToProps)(MyCars)
