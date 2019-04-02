import { USER_Actions } from '../constants/users'
import { USER_Status } from '../constants/users'
const User_initialState = {
  USER_Status: USER_Status.USER_List.NEW,
  UserList: [],
  DeviceList: [],
  // AddDevice:null,
  // EditDevice:null,
  // DeleteDevice:null
};

export const User_Reducer = (state = User_initialState, action) => {
  console.log(action.type);
  switch (action.type) {

    case USER_Actions.USER_List.NEW:
      console.log("I am from Reducer new..");
      return { ...state, USER_Status: USER_Status.USER_List.NEW };
    case USER_Actions.USER_List.POST:
      console.log("I am from Reducer Loading..");
      return { ...state, USER_Status: USER_Status.USER_List.LOADING };
    case USER_Actions.USER_List.SUCCESS:
      console.log("I am from Reducer Success..");
      return { ...state, USER_Status: USER_Status.USER_List.SUCCESS, UserList: action.payload.Users, DeviceList: action.payload.Devices };
    case USER_Actions.USER_List.FAILURE:
      console.log("I am from Reducer FAILURE..");
      return { ...state, USER_Status: USER_Status.USER_List.FAILURE };
    case USER_Actions.USER_List.NETWORK_FAILURE:
      console.log("I am from Reducer NETWORK_FAILURE..");
      return { ...state, USER_Status: USER_Status.USER_List.NETWORK_FAILURE };
    // case USER_Actions.USER_List.ADD_SUCCESS:
    // console.log("I am from Reducer ADD_SUCCESS..");
    // return { ...state, USER_Status: USER_Status.USER_List.ADD_SUCCESS, AddDevice:action.payload};
    // case USER_Actions.USER_List.EDIT_SUCCESS:
    // console.log("I am from Reducer EDIT_SUCCESS..");
    // return { ...state, USER_Status: USER_Status.USER_List.EDIT_SUCCESS, EditDevice:action.payload};
    // case USER_Actions.USER_List.DELETE_SUCCESS:
    // console.log("I am from Reducer DELETE_SUCCESS..");
    // return { ...state, USER_Status: USER_Status.USER_List.DELETE_SUCCESS, DeleteDevice:action.payload};

    default:
      console.log("default is firing")

      return { ...state };

  }
};


const UserEvent_initialState = {
  USEREvent_Status: USER_Status.USER_handler.NEW,
  AddUser: null,
  EditUser: null,
  DeleteUser: null
};

export const UserEvent_Reducer = (state = UserEvent_initialState, action) => {
  console.log('here is user Data', action);
  switch (action.type) {

    case USER_Actions.USER_handler.NEW:
      console.log("I am from Reducer new..");
      return { ...state, USEREvent_Status: USER_Status.USER_handler.NEW };
    case USER_Actions.USER_handler.ADD_SUCCESS:
      console.log("I am from Reducer ADD_SUCCESS..");
      return { ...state, USEREvent_Status: USER_Status.USER_handler.ADD_SUCCESS, AddUser: action.payload };
    case USER_Actions.USER_handler.EDIT_SUCCESS:
      console.log("I am from Reducer EDIT_SUCCESS..");
      return { ...state, USEREvent_Status: USER_Status.USER_handler.EDIT_SUCCESS, EditUser: action.payload };
    case USER_Actions.USER_handler.DELETE_SUCCESS:
      console.log("I am from Reducer DELETE_SUCCESS..");
      return { ...state, USEREvent_Status: USER_Status.USER_handler.DELETE_SUCCESS, DeleteUser: action.payload };

    default:
      console.log("default is firing")

      return { ...state };

  }
};