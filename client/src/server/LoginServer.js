
import { login_Actions } from '../constants/Login'
import store from '../store/index'
import { ROOT_URL } from '../constants/config';

export const loginServer = {
  Authuser: Authuser,
  AuthPass: AuthPass,
}

//Authenticate UserNmae
export function Authuser(username) {

  var user = { 'username': username }
  console.log('userData@@', user)

  const postRequest = fetch(ROOT_URL + '/api/Accounts/AuthUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    mode: 'cors',
    body: JSON.stringify(user)
  }).then((response) => {
    console.log('********' + response.status);
    response.json().then(data => {
      console.log("data:......" + data.status)
      if (data.status == 'failure') {
        store.dispatch({ type: login_Actions.login_SignIn.USER_AUTH_FAILURE, payload: data.err });
        return;
      }
      else if (data.status == 'success') {
        console.log('userAuthoriedData:', data)

        store.dispatch({ type: login_Actions.login_SignIn.LOGINPASSWORD, payload: data });
        return;
      }

    });
  }).catch(() => {
    return { type: login_Actions.login_SignIn.NETWORK_FAILURE };
  })


  return { type: login_Actions.login_SignIn.POST, payload: 'none' };

};

//Authenticate User's Pin Code
export function AuthPass(pin, username) {

  var data = { 'password': pin, 'username': username }

  const postRequest = fetch(ROOT_URL + '/api/Accounts/AuthPass', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    mode: 'cors',
    body: JSON.stringify(data)
  }).then((response) => {
    console.log('********' + response.status);
    response.json().then(data => {
      console.log("data:......" + data.status)
      if (data.status == 'failure') {
        store.dispatch({ type: login_Actions.login_SignIn.PASS_AUTH_FAILURE, payload: data.err });
        return;
      }
      else if (data.status == 'success') {
        console.log('userAuthoriedData:', data)
        localStorage.setItem('userToken', JSON.stringify(data.token))

        store.dispatch({ type: login_Actions.login_SignIn.AUTHORIZED, payload: data });
        return;
      }

    });
  }).catch(() => {
    return { type: login_Actions.login_SignIn.NETWORK_FAILURE };
  })


  return { type: login_Actions.login_SignIn.POST, payload: 'none' };

};


