import { device_Actions } from '../constants/devices'
import { device_Status } from '../constants/devices'
const DeviceListing_initialState = {
  device_Status: device_Status.device_List.NEW,
  DeviceList: [],
  AddDevice: null,
  EditDevice: null,
  DeleteDevice: null,
  err: ''
};

export const Device_Reducer = (state = DeviceListing_initialState, action) => {
  console.log(action.type);
  switch (action.type) {

    case device_Actions.device_List.NEW:
      console.log("I am from Reducer new..");
      return { ...state, device_Status: device_Status.device_List.NEW };
    case device_Actions.device_List.POST:
      console.log("I am from Reducer Loading..");
      return { ...state, device_Status: device_Status.device_List.LOADING };
    case device_Actions.device_List.SUCCESS:
      console.log("I am from Reducer Success..");
      return { ...state, device_Status: device_Status.device_List.SUCCESS, DeviceList: action.payload };
    case device_Actions.device_List.FAILURE:
      console.log("I am from Reducer FAILURE..");
      return { ...state, device_Status: device_Status.device_List.FAILURE, err: action.payload };
    case device_Actions.device_List.NETWORK_FAILURE:
      console.log("I am from Reducer NETWORK_FAILURE..");
      return { ...state, device_Status: device_Status.device_List.NETWORK_FAILURE };
    case device_Actions.device_List.ADD_SUCCESS:
      console.log("I am from Reducer ADD_SUCCESS..");
      return { ...state, device_Status: device_Status.device_List.ADD_SUCCESS, AddDevice: action.payload };
    case device_Actions.device_List.EDIT_SUCCESS:
      console.log("I am from Reducer EDIT_SUCCESS..");
      return { ...state, device_Status: device_Status.device_List.EDIT_SUCCESS, EditDevice: action.payload };
    case device_Actions.device_List.DELETE_SUCCESS:
      console.log("I am from Reducer DELETE_SUCCESS..");
      return { ...state, device_Status: device_Status.device_List.DELETE_SUCCESS, DeleteDevice: action.payload };

    default:
      console.log("default is firing")

      return { ...state };

  }
};