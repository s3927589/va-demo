import { UPLOAD_FILE } from '../actionCreators'

const initState = {
	cv: true,
	youhandMac: true,
	youhandWin: true,
	youhandStreamlit: true
}

const uploadReducer = (state = initState, action) => {
	switch (action.type)
	{
		case UPLOAD_FILE:
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}

export default uploadReducer
