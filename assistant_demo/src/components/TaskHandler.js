import React from 'react';
import { connect } from 'react-redux';
import { doneCommand, addCar } from '../redux/actionCreators'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { HIEN_DANH_SACH, THEM_O_TO, THONG_TIN_O_TO } from './TaskConfig'

let timecount = (new Date()).getTime()

const TaskHandler = ({ cars, command, doneCommand, addCar }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const getCar = (id) => {
		for (let i = 0; i < cars.length; i++) {
			// already exist
			if (cars[i].id === id)
				return cars[i]
		}
	}

	if (command.active) {
		let current = (new Date()).getTime()
		if (current - timecount > 2000) {
			timecount = current

			const commandType = command.type;
			if (commandType === HIEN_DANH_SACH) {
				doneCommand()
				if (location.pathname !== "/browse")
					navigate("/browse")
			} else if (commandType.match(new RegExp(THONG_TIN_O_TO, "gi"))) {
				const id = commandType.split("-")[1]
				const path = "/" + id
				doneCommand()
				if (location.pathname !== path)
					navigate("/" + id)
			} else if (commandType.match(new RegExp(THEM_O_TO, "gi"))) {
				const id = commandType.split("-")[1]
				addCar(getCar(id))
				doneCommand()
				if (location.pathname !== "/my-cars")
					navigate("/my-cars")
			}
		}
	}

	return (
		<div></div>
	)
}

TaskHandler.propTypes = {
	command: PropTypes.object,
	cars: PropTypes.array,
	doneCommand: PropTypes.func,
	addCar: PropTypes.func
}

// specify which one we want to receive
const mapStateToProps = (state) => ({
	command: state.command,
	cars: state.cars.cars,
})

const mapDispatchToProps = (dispatch) => ({
	doneCommand: () => dispatch(doneCommand()),
	addCar: (car) => dispatch(addCar(car))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskHandler)
