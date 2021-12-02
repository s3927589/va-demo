import { COMMAND } from '../actionCreators'

const initialState = {
	type: null,
	active: false,
}

const courseReducer = (state = initialState, action) => {
	if (action.type === COMMAND)
		return {
			...state,
			...action.payload
		}
	return state
}

export default courseReducer


