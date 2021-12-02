import { IN_CAR } from '../actionCreators'

const initialState = {
	isInCar: false,
	inCarId: 0,
}

const carReducer = (state = initialState, action) => {
	if (action.type === IN_CAR) {
		return {
			cars: [
				...state.cars,
				action.payload
			]
		}
	}
	return state
}

export default carReducer



