export const MY_CAR = 'MY_CAR'
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
