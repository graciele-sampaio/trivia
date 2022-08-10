import { combineReducers } from 'redux';
import player from './player';
import apiToken from './apiToken';
import timer from './timer';

const rootReducer = combineReducers({ player, apiToken, timer });

export default rootReducer;
