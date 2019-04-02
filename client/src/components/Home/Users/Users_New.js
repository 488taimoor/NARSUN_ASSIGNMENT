import React, { Component } from 'react';
import { Typography, Grid, Menu, MenuItem, TextField, Button, Hidden } from '@material-ui/core';
import validator from 'validator';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class Users_New extends Component {
    constructor(props) {
        super(props);
        this.state = {

            firstName: '',
            FirstNameHelperText: '',
            ErrorMsgFirstName: false,

            lastName: '',
            LastNameHelperText: '',
            ErrorMsgLastName: false,

            anchorEl: null,
            selectedDevice: 'Select Device',
            deviceId: null,
            editMode: false
        };
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handlelastName = this.handlelastName.bind(this)
    }

    componentWillReceiveProps(nextProps, prevProps) {
        console.log('nextProps', nextProps)
        if (nextProps.selectedUser != null || nextProps.selectedUser != undefined) {
            this.setState({
                firstName: nextProps.selectedUser.firstName,
                lastName: nextProps.selectedUser.lastName,
                editMode: true
            })
        }else{
            this.setState({
                firstName: '',
                lastName: '',
                editMode: false
            })
        }
    }

    handlelastName(event) {
        ((validator.isAlphanumeric(event.target.value) && (!validator.contains(event.target.value, ' '))) || (event.target.value === '')) ?
            this.setState({
                LastNameHelperText: '',
                ErrorMsgLastName: false
            })
            :
            this.setState({
                LastNameHelperText: 'Alfabets are not allowed!',
                ErrorMsgLastName: true
            })


        this.setState({ lastName: event.target.value });
    }

    handleFirstName(event) {
        ((validator.isAlphanumeric(event.target.value) && (!validator.contains(event.target.value, ' '))) || (event.target.value === '')) ?
            this.setState({
                FirstNameHelperText: '',
                ErrorMsgFirstName: false
            })
            :
            this.setState({
                FirstNameHelperText: 'Special characters or spaces are not allowed',
                ErrorMsgFirstName: true
            })


        this.setState({ firstName: event.target.value });
    }

    handleSubmit = () => {
        var flag = (this.state.firstName == '' || this.state.lastName == '')
        if (flag) {
            this.setState({
                ErrorMessage: 'Fist name & Last Name both are Required!',
            })
        }
        else {
            this.setState({
                ErrorMessage: '',
                firstName: '',
                lastName: '',
            })
            let UserData = {
                firstName: this.state.firstName.toLowerCase(),
                lastName: this.state.lastName.toLowerCase(),
                deviceId: this.state.deviceId
            }
            console.log('hereis user Data:', UserData)
            this.props.handleAddUser(UserData)
        }

    }
    handleUpdate = () => {
        var flag = (this.state.firstName == '' || this.state.lastName == '')
        if (flag) {
            this.setState({
                ErrorMessage: 'Fist name & Last Name both are Required!',
            })
        }
        else {
            this.setState({
                ErrorMessage: '',
                firstName: '',
                lastName: '',
                editMode: false,
                selectedDevice:'Select Device'
            })
            let UserData = {
                _id: this.props.selectedUser._id,
                firstName: this.state.firstName.toLowerCase(),
                lastName: this.state.lastName.toLowerCase(),
                deviceId: this.state.deviceId
            }
            console.log('hereis  Updated Data:', UserData)
            this.props.UpdateUser(UserData)
        }
    }

    handleClick = event => {
        console.log('here is click', event)
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (event) => {
        console.log('here is close', event)
        this.setState({ anchorEl: null });
    };

    handleSelect = (item) => {
        console.log('here is close', item)
        this.setState({ anchorEl: null, selectedDevice: item.deviceName, deviceId: item._id });
    };
    render() {
        return (
            <div>
                <Grid container direction='row' alignItems='center' justify='space-between'>
                    <Grid item lg={12}>
                        <Card >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Add User
                            </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            error={this.state.ErrorMsgFirstName}
                            placeholder="Taimoor"
                            value={this.state.firstName}
                            onChange={this.handleFirstName}
                            helperText={this.state.FirstNameHelperText}
                            label="First Name" margin="normal"

                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            error={this.state.ErrorMsgLastName}
                            placeholder="khan"
                            value={this.state.lastName}
                            onChange={this.handlelastName}
                            helperText={this.state.LastNameHelperText}
                            label="Last Name" margin="normal"

                        />
                    </Grid>
                    <Grid item lg={4}>
                        <div>
                            <Button
                                aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                color='primary'
                            >
                                {this.state.selectedDevice}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                {this.props.DeviceList.length == 0 ?
                                    (
                                        <MenuItem onClick={this.handleClose}>No device found!</MenuItem>
                                    ) : (
                                        this.props.DeviceList.map((item) => {
                                            return (<MenuItem onClick={() => this.handleSelect(item)}>{item.deviceName}</MenuItem>)
                                        })
                                    )}
                            </Menu>
                        </div>
                    </Grid>
                </Grid>

                <Typography style={{ color: 'red' }}>{this.state.ErrorMessage}</Typography>
                {this.state.editMode ? (
                    <Button type='submit' onClick={this.handleUpdate} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                        UPDATE
                </Button>
                )
                    : (
                        <Button type='submit' onClick={this.handleSubmit} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                            ADD
                </Button>
                    )}

            </div>

        );
    }
}

export default Users_New;