import React, { Component } from 'react';


class LoginFailure extends Component {
    constructor(props){
        super(props);
    }
    render() {

        return (
          <div>
              <h1> Something went wrong ,please try again</h1>
          </div>
        );
    }
}

export default LoginFailure;
