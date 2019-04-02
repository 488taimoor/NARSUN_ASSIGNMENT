import { login_Actions } from '../constants/Login'
import { login_Status } from '../constants/Login'
const login_initialState = {
  login_status: login_Status.login_SignIn.NEW,
  userData: "",
  UserAutherror: ''
};

export default function (state = login_initialState, action) {
  console.log('reducerData', action.payload);
  switch (action.type) {

    case login_Actions.login_SignIn.NEW:
      console.log("I am from Reduce new..");
      return { ...state, login_status: login_Status.login_SignIn.NEW };
    case login_Actions.login_SignIn.POST:
      console.log("I am from Reduce Loading..");
      return { ...state, login_status: login_Status.login_SignIn.LOADING };
    case login_Actions.login_SignIn.LOGINPASSWORD:
      console.log("I am from Reduce Password..");
      return { ...state, login_status: login_Status.login_SignIn.LOGINPASSWORD, userData: action.payload };
    case login_Actions.login_SignIn.AUTHORIZED:
      console.log("I am from Reducer authorized..");
      return { ...state, login_status: login_Status.login_SignIn.AUTHORIZED, userid: action.payload.userid }
    case login_Actions.login_SignIn.NOT_AUTHORIZED:
      console.log("I am from Reducer not authorized..");
      return { ...state, login_status: login_Status.login_SignIn.NOT_AUTHORIZED }
    case login_Actions.login_SignIn.USER_AUTH_FAILURE:
      console.log("I am from Reduce uSER_AUTH_Failure..");
      return { ...state, login_status: login_Status.login_SignIn.USER_AUTH_FAILURE, UserAutherror: action.payload }
    case login_Actions.login_SignIn.PASS_AUTH_FAILURE:
      console.log("I am from Reduce PASS_AUTH_Failure..");
      return { ...state, login_status: login_Status.login_SignIn.PASS_AUTH_FAILURE, UserAutherror: action.payload }
    case login_Actions.login_SignIn.NETWORK_FAILURE:
      console.log("I am from Reduce NETWORK_Failure..");
      return { ...state, login_status: login_Status.login_SignIn.NETWORK_FAILURE }
    default:
      console.log("default is firing")

      return { ...state };

  }
};
