import React, { Component } from 'react';
import { connect } from "react-redux";
import { USER_Status } from '../../../constants/users'
import Users_Container from './Users_Container'
import { UsersServer } from '../../../server/UsersServer'

const mapStateToProps = (state) => {
    console.log("****************************state:", state);
    return {

        USER_Status: state.User_Reducer.USER_Status,
        UserList: state.User_Reducer.UserList,
        DeviceList: state.User_Reducer.DeviceList
    };

};

const mapDispatchToProps = (dispatch) => {

    return {
        getAllUsers: () => { dispatch(UsersServer.getAllUsers()) },
    };
};


class Users_View extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        this.props.getAllUsers()
    }
    getScreen(status) {
        switch (status) {
            case USER_Status.USER_List.NEW:
                return (
                    <Users_Container UserList={this.props.UserList} DeviceList={this.props.DeviceList} />
                );
                break;
            case USER_Status.USER_List.LOADING:
                return (
                    <div>LOADING</div>
                );
                break;
            case USER_Status.USER_List.SUCCESS:
                return (
                    <Users_Container UserList={this.props.UserList} DeviceList={this.props.DeviceList} />
                );
                break;
            case USER_Status.USER_List.FAILURE:
                return (
                    <div>FAILURE</div>
                );
                break;
            case USER_Status.USER_List.NETWORK_FAILURE:
                return (
                    <div>Network_Failure</div>
                );
                break;
            default:
                break;

        }
    }
    render() {
        console.log('Device View Status', this.props.USER_Status)
        return (
            <div>
                {this.getScreen(this.props.USER_Status)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users_View);