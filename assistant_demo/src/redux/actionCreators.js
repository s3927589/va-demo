export const MY_CAR = 'MY_CAR'
export const IN_CAR = 'IN_CAR'
export const COMMAND = 'COMMAND'

export const updateCommand = (commandType) => {
	return (dispatch) => {
		dispatch({
			type: COMMAND,
			payload: {
				type: commandType,
				active: true
			}
		})
	}
}

export const doneCommand = () => {
	return (dispatch) => {
		dispatch({
			type: COMMAND,
			payload: {
				type: null,
				active: false,
			}
		})
	}
}

export const addCar = (car) => {
	return (dispatch) => {
		dispatch({
			type: MY_CAR,
			payload: car
		})
	}
}

export const enableInCar = (id) => {
	return (dispatch) => {
		dispatch({
			type: IN_CAR,
			payload: {
				isInCar: true,
				inCarId: id
			}
		})
	}
}

export const disableIn = (id) => {
	return (dispatch) => {
		dispatch({
			type: IN_CAR,
			payload: {
				isInCar: true,
				inCarId: id
			}
		})
	}
}
