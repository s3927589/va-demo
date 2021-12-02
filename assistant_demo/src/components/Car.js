import React from 'react'
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { addCar } from '../redux/actionCreators'
import PropTypes from 'prop-types'
import TaskHandler from './TaskHandler'

const Car = (props) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const myCar = props.cars.find(car => car.id === id)

	const handleAdd = () => {
		// go back to home page
		props.addCar(myCar)
		navigate('/my-cars')
	}

	const car = myCar ? (
		<div className="car">
			<h4 className="center">{myCar.title}</h4>
			<img src={myCar.img} width="300" />
			{myCar.body}
			<div className="center padding">
				<button className="btn red" onClick={handleAdd}>
				 	Thêm vào kho
				</button>
			</div>
		</div>
	) : (
		<div className="center">Loading car...</div>
	)

	return (
		<div className="container">
			{car}
			<TaskHandler />
		</div>
	)
}

Car.propTypes = {
	history: PropTypes.object,
	cars: PropTypes.array,
	addCar: PropTypes.func
}

// ownProp: my old prop
const mapStateToCar = (state, ownProps) => ({
	cars: state.cars.cars,
})

const mapDispatchToProps = (dispatch) => ({
	addCar: (car) => dispatch(addCar(car))
})

export default connect(mapStateToCar, mapDispatchToProps)(Car)
