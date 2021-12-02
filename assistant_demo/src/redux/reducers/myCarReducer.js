import { MY_CAR } from '../actionCreators'

const initialState = {
	cars: [],
}

const carReducer = (state = initialState, action) => {
	if (action.type === MY_CAR) {
		const id = action.payload.id
		for (let i = 0; i < state.cars.length; i++) {
			// already exist
			if (state.cars[i].id === id)
				return state
		}

		// state.cars.push(action.payload)
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


