import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tab, Tabs, AppBar, Grid, Typography } from '@material-ui/core';
import { connect } from "react-redux";
import {USER_Status} from '../../../constants/users'
import {UsersServer} from '../../../server/UsersServer'

const mapStateToProps = (state) => {
    console.log("****************************state:", state);
    return {
    
        USER_Status: state.User_Reducer.USER_Status,
        UserList:state.User_Reducer.UserList,
        DeviceList: state.User_Reducer.DeviceList
    };
    
  };
  
  const mapDispatchToProps = (dispatch) => {
  
    return {
    getAllUsers : () =>{dispatch(UsersServer.getAllUsers()) },
    };
  };

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}




class SettingsTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <Grid container justify='center'>
                <Grid item lg={3}></Grid>
                <Grid item lg={6}>
                    <div >
                        <AppBar position="static" color='default'>
                            <Tabs value={value} onChange={this.handleChange} centered={true}>
                                <Tab label="Setting 1" />
                                <Tab label="Setting 2" />
                                <Tab label="Setting 3" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <TabContainer>Setting1</TabContainer>}
                        {value === 1 && <TabContainer>Setting2</TabContainer>}
                        {value === 2 && <TabContainer>Setting3</TabContainer>}
                    </div>
                </Grid>
                <Grid item lg={3}></Grid>
            </Grid>

        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SettingsTabs);
