import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './user/userReducer'
import messageReducer from './message/messageReducer'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    userReducer,
    messageReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store