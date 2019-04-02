import { combineReducers } from 'redux';
import login_Reducer from './login';
import { Device_Reducer } from './device';
import { User_Reducer } from './users';
import { UserEvent_Reducer } from './users'
const rootReducer = combineReducers({
  login_Reducer,
  Device_Reducer,
  User_Reducer,
  UserEvent_Reducer
});

export default rootReducer;
