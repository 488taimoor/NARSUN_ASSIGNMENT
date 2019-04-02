import React, { Component } from 'react';
import Users_List from './Users_List';

import { connect } from "react-redux";
import { USER_Status } from '../../../constants/users'
import { UsersServer } from '../../../server/UsersServer'

const mapStateToProps = (state) => {
    console.log("****************************state:", state);
    return {

        USEREvent_Status: state.UserEvent_Reducer.USEREvent_Status,
        EditUser: state.UserEvent_Reducer.EditUser,
        DeleteUser: state.UserEvent_Reducer.DeleteUser,
        AddUser: state.UserEvent_Reducer.AddUser
    };

};

const mapDispatchToProps = (dispatch) => {

    return {
        handleAddUser: (UserData) => { dispatch(UsersServer.handleAddUser(UserData)) },
        UpdateUser: (userData) => { dispatch(UsersServer.UpdateUser(userData)) },
        handleDelete: (id) => { dispatch(UsersServer.handleDelete(id)) }
    };
};
class Users_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getScreen(status) {
        switch (status) {
            case USER_Status.USER_handler.NEW:
                return (
                    <Users_List AddUser={this.props.AddUser} DeleteUser={this.props.DeleteUser} handleDelete={this.props.handleDelete} USEREvent_Status={this.props.USEREvent_Status} EditUser={this.props.EditUser} UpdateUser={this.props.UpdateUser} UserList={this.props.UserList} handleAddUser={this.props.handleAddUser} DeviceList={this.props.DeviceList} />
                );
                break;
            case USER_Status.USER_handler.ADD_SUCCESS:
                return (
                    <Users_List AddUser={this.props.AddUser} DeleteUser={this.props.DeleteUser} handleDelete={this.props.handleDelete} USEREvent_Status={this.props.USEREvent_Status} EditUser={this.props.EditUser} UpdateUser={this.props.UpdateUser} UserList={this.props.UserList} handleAddUser={this.props.handleAddUser} DeviceList={this.props.DeviceList} />
                );
                break;
            case USER_Status.USER_handler.EDIT_SUCCESS:
                return (
                    <Users_List AddUser={this.props.AddUser} DeleteUser={this.props.DeleteUser} handleDelete={this.props.handleDelete} USEREvent_Status={this.props.USEREvent_Status} EditUser={this.props.EditUser} UpdateUser={this.props.UpdateUser} UserList={this.props.UserList} handleAddUser={this.props.handleAddUser} DeviceList={this.props.DeviceList} />
                );
                break;
            case USER_Status.USER_handler.DELETE_SUCCESS:
                return (
                    <Users_List AddUser={this.props.AddUser} DeleteUser={this.props.DeleteUser} handleDelete={this.props.handleDelete} USEREvent_Status={this.props.USEREvent_Status} EditUser={this.props.EditUser} UpdateUser={this.props.UpdateUser} UserList={this.props.UserList} handleAddUser={this.props.handleAddUser} DeviceList={this.props.DeviceList} />
                );
                break;
            default:
                break;

        }
    }
    render() {
        console.log('Device View Status', this.props.USEREvent_Status)
        return (
            <div>
                {this.getScreen(this.props.USEREvent_Status)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users_Container);