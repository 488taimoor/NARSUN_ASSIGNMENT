import React, { Component } from 'react';
import Users_New from './Users_New'
import {
    Typography,
    CardActions,
    Grid,
    CardContent,
    TextField,
    Button,
    Paper,
    withStyles,
    Hidden,
    CardActionArea,
    CardMedia,
    Menu, MenuItem,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import PropTypes from 'prop-types';
import { USER_Status } from '../../../constants/users'


class Users_List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: this.props.UserList,
            deviceId: null
        };
    }


    componentWillReceiveProps(nextProps, prevProps) {
        console.log('here are next Props', nextProps)
        if (nextProps.USEREvent_Status == USER_Status.USER_handler.ADD_SUCCESS) {

            console.log('Add User')
            this.state.Users.push(nextProps.AddUser)


        } else
            if (nextProps.USEREvent_Status == USER_Status.USER_handler.EDIT_SUCCESS) {

                console.log('Edit User')
                let value = this.state.Users.map((item) => {
                    if (item._id === nextProps.EditUser._id) {
                        console.log('here is search value of Array', item)
                        let index = this.state.Users.indexOf(item)
                        console.log('this is final index', index)
                        this.state.Users[index] = nextProps.EditUser

                    }
                })

                this.setState({
                    selectedUser: null
                })

            } else if (nextProps.USEREvent_Status == USER_Status.USER_handler.DELETE_SUCCESS) {

                console.log('Delete User')
                let value = this.state.Users.map((item) => {
                    if (item._id === nextProps.DeleteUser._id) {
                        console.log('here is search value of Array', item)
                        let index = this.state.Users.indexOf(item)
                        console.log('this is final index', index)
                        this.state.Users.splice(index, 1)


                    }
                })


            }
            else {
                console.log('else')
            }
    }



    handleSelect = (deviceitem, item) => {
        console.log('here is select', item, deviceitem)
        this.setState({ anchorEl: null, deviceId: deviceitem._id }, () => {
            console.log('here is selected ', this.state.deviceId)
            var userData = {
                _id: item._id,
                firstName: item.firstName,
                lastName: item.lastName,
                deviceId: deviceitem._id

            }
            this.props.UpdateUser(userData)
        });
    };

    handleTaken = (item) => {
        var userData = {
            _id: item._id,
            firstName: item.firstName,
            lastName: item.lastName,
            deviceId: null

        }
        this.props.UpdateUser(userData)
    }

    handleAvailable = (item) => {
        console.log('here is data', item)
        this.setState({
            selectedUser: item
        })
    }



    render() {
        return (
            <div>
                <Users_New UpdateUser={this.props.UpdateUser} selectedUser={this.state.selectedUser} handleAddUser={this.props.handleAddUser} DeviceList={this.props.DeviceList} />
                {this.state.Users.length == 0 ?
                    (
                        <Card >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    No record found!
                            </Typography>

                            </CardContent>
                        </Card>
                    )
                    : (
                        this.state.Users.map((item) => {

                            return (<Card >
                                <Grid container >
                                    <Grid item lg={8}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Name: {item.firstName} {item.lastName}
                                            </Typography>
                                            {item.deviceId == null ? (
                                                <div>
                                                    <Typography component="p">
                                                        Device Name: Not assigned yet!
                                                    </Typography>
                                                    <Button type='submit' disabled={true} onClick={this.handleSubmit} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                                                        TAKEN
                                                     </Button>
                                                    <Button type='submit' onClick={() => this.handleAvailable(item)} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                                                        AVAILABLE
                                                    </Button>

                                                </div>
                                            ) : (
                                                    <div> <Typography component="p">
                                                        Device Name: {item.deviceId.deviceName}
                                                    </Typography>
                                                        <Button type='submit' onClick={() => this.handleTaken(item)} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                                                            TAKEN
                                </Button>
                                                        <Button type='submit' disabled={true} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                                                            AVAILABLE
                                </Button>
                                                    </div>
                                                )}


                                        </CardContent>


                                    </Grid>
                                    <Grid item leg={4} >
                                        <CardActions>
                                            <IconButton onClick={() => this.props.handleDelete(item._id)} aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Grid>
                                </Grid>
                            </Card>)
                        })
                    )}



            </div>
        );
    }
}

export default Users_List;