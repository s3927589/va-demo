import carReducer from './carReducer'
import myCarReducer from './myCarReducer'
import commandReducer from './commandReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	cars: carReducer,
	myCars: myCarReducer,
	command: commandReducer,
})

export default rootReducer
