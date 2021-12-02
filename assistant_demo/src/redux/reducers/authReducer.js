import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actionCreators'

const initState = {
	authLoaded: false,
	hasError: false,
	token: "",
}

const authReducer = (state = initState, action) => {
	switch (action.type)
	{
		case LOGIN_SUCCESS:
			return {
				...state,
				authLoaded: true,
				hasError: false,
				token: action.payload
			}
		case LOGIN_FAILED:
			return {
				... state,
				authLoaded: true,
				hasError: true,
			}
		case LOGOUT_SUCCESS:
			return {
				... state,
				authLoaded: false,
				hasError: false,
				token: "",
			}
		default:
			return state
	}
}

export default authReducer;
