import React, { Component } from "react";
import { connect } from "react-redux";
import { device_Status } from '../../../constants/devices'
import Device_List from './Device_List'
import { DevicesServer } from '../../../server/DevicesServer'




const mapStateToProps = (state) => {
  console.log("****************************state:", state);
  return {

    device_Status: state.Device_Reducer.device_Status,
    DeviceList: state.Device_Reducer.DeviceList,
    AddDevice: state.Device_Reducer.AddDevice,
    EditDevice: state.Device_Reducer.EditDevice,
    DeleteDevice: state.Device_Reducer.DeleteDevice,
    err: state.Device_Reducer.err,
  };

};

const mapDispatchToProps = (dispatch) => {

  return {

    handleAddDevice: (DeviceData) => { dispatch(DevicesServer.handleAddDevice(DeviceData)) },
    handleUpdateDevice: (DeviceData) => { dispatch(DevicesServer.handleUpdateDevice(DeviceData)) },
    handleDelete: (id) => { dispatch(DevicesServer.handleDelete(id)) },
    getDevicesList: () => { dispatch(DevicesServer.getDevicesList()) },
  };
};

class Devices_View extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    this.props.getDevicesList()
  }
  getScreen(status) {
    switch (status) {
      case device_Status.device_List.NEW:
        return (
          <Device_List handleDelete={this.props.handleDelete} DeleteDevice={this.props.DeleteDevice} handleAddDevice={this.props.handleAddDevice} handleUpdateDevice={this.props.handleUpdateDevice} DeviceList={this.props.DeviceList} AddDevice={this.props.AddDevice} EditDevice={this.props.EditDevice} />
        );
        break;
      case device_Status.device_List.LOADING:
        return (
          <div>loading</div>
        );
        break;
      case device_Status.device_List.SUCCESS:
        return (
          <Device_List device_Status={this.props.device_Status} handleDelete={this.props.handleDelete} DeleteDevice={this.props.DeleteDevice} handleAddDevice={this.props.handleAddDevice} handleUpdateDevice={this.props.handleUpdateDevice} DeviceList={this.props.DeviceList} AddDevice={this.props.AddDevice} EditDevice={this.props.EditDevice} />
        );
        break;
      case device_Status.device_List.ADD_SUCCESS:
        return (
          <Device_List device_Status={this.props.device_Status} handleDelete={this.props.handleDelete} DeleteDevice={this.props.DeleteDevice} handleAddDevice={this.props.handleAddDevice} handleUpdateDevice={this.props.handleUpdateDevice} DeviceList={this.props.DeviceList} AddDevice={this.props.AddDevice} EditDevice={this.props.EditDevice} />
        );
        break;
      case device_Status.device_List.EDIT_SUCCESS:
        return (
          <Device_List device_Status={this.props.device_Status} handleDelete={this.props.handleDelete} DeleteDevice={this.props.DeleteDevice} handleAddDevice={this.props.handleAddDevice} handleUpdateDevice={this.props.handleUpdateDevice} DeviceList={this.props.DeviceList} AddDevice={this.props.AddDevice} EditDevice={this.props.EditDevice} />

        );
        break;
      case device_Status.device_List.DELETE_SUCCESS:
        return (
          <Device_List device_Status={this.props.device_Status} handleDelete={this.props.handleDelete} DeleteDevice={this.props.DeleteDevice} handleAddDevice={this.props.handleAddDevice} handleUpdateDevice={this.props.handleUpdateDevice} DeviceList={this.props.DeviceList} AddDevice={this.props.AddDevice} EditDevice={this.props.EditDevice} />
        );
        break;
      case device_Status.device_List.FAILURE:
        return (
          <div>{this.props.err}</div>
        );
        break;
      case device_Status.device_List.NETWORK_FAILURE:
        return (
          <div>Network failure</div>
        );
        break;

      default:
        break;
    }


  }

  render() {
    console.log('Device View Status', this.props.device_Status)
    return (
      <div>
        {this.getScreen(this.props.device_Status)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices_View);