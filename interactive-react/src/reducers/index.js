// src/reducers/index.js
import cart from './cart';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
    cart,
    routing: routerReducer
});
export default rootReducer;