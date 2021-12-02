import { KEY_RETRIEVAL } from '../actionCreators'

const initState = {
	emailjs: false,
}

const uploadReducer = (state = initState, action) => {
	switch (action.type)
	{
		case KEY_RETRIEVAL:
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}

export default uploadReducer
