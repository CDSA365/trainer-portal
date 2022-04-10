import { combineReducers } from 'redux'
import classReducer from './class.reducer'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    classes: classReducer,
})

export default rootReducer
