
import React, { Component } from "react";
import { connect } from "react-redux";

import Login_Failure from './SignIn_Failure'
import Login_Loading from './SignIn_loading'
import Login_UserAuth from './SignIn_UserAuth'
import LoginSuccess from './SignIn_Success'
import Login_PassAuth from './SignIn_PassAuth'
import { loginServer } from '../../server/LoginServer';
import { login_Status } from '../../constants/Login';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'


const mapStateToProps = (state) => {
  console.log("****************************state:", state);
  return {
    login_status: state.login_Reducer.login_status,
    UserAutherror:state.login_Reducer.UserAutherror,
    userData:state.login_Reducer.userData
    
  };
  
};

const mapDispatchToProps = (dispatch) => {

  return {

    Authuser: (username) => { dispatch(loginServer.Authuser(username)) },
    AuthPass: (pin, username) => { dispatch(loginServer.AuthPass(pin, username)) },
  };
};

class LoginView extends Component {

  getScreen(status) {
    console.log("I am from login Component getScreen: " + status);
      switch (status) {
        case login_Status.login_SignIn.NEW:
          return (
            <Login_UserAuth Authuser={this.props.Authuser} />
          );
          break;
        case login_Status.login_SignIn.SIGN0UT:
          return (
            <Login_UserAuth handleSignIn={this.props.handleSignIn} CreateButton={this.props.CreateButton} />
          );
          break;
        case login_Status.login_SignIn.USER_AUTH_FAILURE:
          return (
            <Login_UserAuth Authuser={this.props.Authuser}   UserAutherror={this.props.UserAutherror}/>
          );
        break;
        case login_Status.login_SignIn.LOGINPASSWORD:
          return (
            <Login_PassAuth AuthPass={this.props.AuthPass} userData={this.props.userData}/>
          );
          break;
          case login_Status.login_SignIn.PASS_AUTH_FAILURE:
          return (
            <Login_PassAuth AuthPass={this.props.AuthPass} userData={this.props.userData} PassAutherror={this.props.UserAutherror}/>
          );
        break;
        case login_Status.login_SignIn.AUTHORIZED:
          return (
              <Redirect to={'/home/'}></Redirect>
          );
          break;
          case login_Status.login_SignIn.NOT_AUTHORIZED:
            return (
              
              <Login_UserAuth status={status} handleSignIn={this.props.handleSignIn} CreateButton={this.props.CreateButton} />
            );
            break;
          case login_Status.login_SignIn.LOADING:
            return (
              <Login_Loading />
            );
            break;
        default:
          break;
      }

    
  }

  render() {
    return (
      <div>
          {this.getScreen(this.props.login_status)}
          </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView));

