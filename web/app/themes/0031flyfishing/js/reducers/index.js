import { combineReducers } from 'redux'
import appReducer from './app'
import contentReducer from './content'

const rootReducer = combineReducers({
    appReducer,
    contentReducer
})

export default rootReducer
