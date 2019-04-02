
import { USER_Actions } from '../constants/users'
import store from '../store/index'
import { ROOT_URL } from '../constants/config';

export const UsersServer = {
    getAllUsers,
    handleAddUser,
    UpdateUser,
    handleDelete
}


//Get All List of Users
export function getAllUsers() {
    var token = localStorage.getItem('userToken')
    console.log('here is token', token)


    const Request = fetch(ROOT_URL + '/api/getAllUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': token },
        mode: 'cors',
    }).then((response) => {
        console.log('********' + response);
        response.json().then(data => {
            console.log("Users list data:......", data)
            if (data.status == 'success') {
                store.dispatch({ type: USER_Actions.USER_List.SUCCESS, payload: data });
                return;
            } else if (data.status == 'failure') {
                store.dispatch({ type: USER_Actions.USER_List.FAILURE, payload: data.err });
                return;
            }
        })
    }).catch(() => {
        return { type: USER_Actions.USER_List.NETWORK_FAILURE };
    })



    return { type: USER_Actions.USER_List.POST };

};

//Add New User
export function handleAddUser(UserData) {
    var token = localStorage.getItem('userToken')
    console.log('here is token', token)


    const Request = fetch(ROOT_URL + '/api/AddUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': token },
        mode: 'cors',
        body: JSON.stringify(UserData)
    }).then((response) => {
        console.log('********' + response);
        response.json().then(data => {
            console.log("Users list data:......", data)
            if (data.status == 'success') {
                store.dispatch({ type: USER_Actions.USER_handler.ADD_SUCCESS, payload: data.data });
                return;
            } else if (data.status == 'failure') {
                store.dispatch({ type: USER_Actions.USER_List.FAILURE, payload: data.err });
                return;
            }
        })
    }).catch(() => {
        return { type: USER_Actions.USER_List.NETWORK_FAILURE };
    })



    return { type: USER_Actions.USER_handler.NEW };

};

//Update User
export function UpdateUser(UserData) {
    var token = localStorage.getItem('userToken')
    console.log('here is token', token)
    const Request = fetch(ROOT_URL + '/api/UpdateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': token },
        mode: 'cors',
        body: JSON.stringify(UserData)
    }).then((response) => {
        console.log('********' + response);
        response.json().then(data => {
            console.log("Users list data:......", data)
            if (data.status == 'success') {
                store.dispatch({ type: USER_Actions.USER_handler.EDIT_SUCCESS, payload: data.data });
                return;
            } else if (data.status == 'failure') {
                store.dispatch({ type: USER_Actions.USER_List.FAILURE, payload: data.err });
                return;
            }
        })
    }).catch(() => {
        return { type: USER_Actions.USER_List.NETWORK_FAILURE };
    })



    return { type: USER_Actions.USER_handler.NEW };

};

//Delete User
export function handleDelete(userid) {
    var userId = { 'userId': userid }
    var token = localStorage.getItem('userToken')
    console.log('here is token', token)
    const Request = fetch(ROOT_URL + '/api/DeleteUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': token },
        mode: 'cors',
        body: JSON.stringify(userId)
    }).then((response) => {
        console.log('********' + response);
        response.json().then(data => {
            console.log("Users list data:......", data)
            if (data.status == 'success') {
                store.dispatch({ type: USER_Actions.USER_handler.DELETE_SUCCESS, payload: data.data });
                return;
            } else if (data.status == 'failure') {
                store.dispatch({ type: USER_Actions.USER_List.FAILURE, payload: data.err });
                return;
            }
        })
    }).catch(() => {
        return { type: USER_Actions.USER_List.NETWORK_FAILURE };
    })



    return { type: USER_Actions.USER_handler.NEW };

};

