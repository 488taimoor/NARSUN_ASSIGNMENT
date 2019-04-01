import { combineReducers } from 'redux';
import login_Reducer from './login';
import {Device_Reducer} from './device';
const rootReducer = combineReducers({
  login_Reducer,
  Device_Reducer
});

export default rootReducer;
