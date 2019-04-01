import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

class LoginSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event) {
       let usertoken = localStorage.getItem('userToken')
       localStorage.removeItem('userToken')
       console.log('localStorage@@@', localStorage.getItem('userToken'))

        this.props.handleBackClick(usertoken);
    }

    render() {
        return (
          <div>
            <h1>You have been logged in successfully</h1>
            <Button onClick={this.handleClick} color='primary'>Logout</Button>
            </div>
        );
    }
}



export default withRouter(LoginSuccess);
