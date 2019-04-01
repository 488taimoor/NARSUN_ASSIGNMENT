import React, { Component } from 'react';
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
    CardMedia
} from '@material-ui/core';
import PropTypes from 'prop-types';
import validator from 'validator';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileUpload from '@material-ui/icons/FileUpload';
import { device_Status } from '../../../constants/devices'

import Device_Add from './Device_Add'

class Device_List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'this is value',
            isEditableMode: false,
            DeviceData: this.props.DeviceList,
            cars: ["Saab", "Volvo", "BMW"],
            editingPoint: '',
            editingPoint2: '',
            ErrorMessage: ''

        }
        this.handleName = this.handleName.bind(this)
        this.handleCost = this.handleCost.bind(this)
        this.handleExpiry = this.handleExpiry.bind(this)
        this.handleWarranty = this.handleWarranty.bind(this)
        this.handleFileUploadEdit = this.handleFileUploadEdit.bind(this)
        // this.handleDelete=this.handleDelete.bind(this)

    }

    componentWillReceiveProps(nextProps, prevProps) {
        console.log('here are next Props', nextProps)
        if (nextProps.device_Status == device_Status.device_List.ADD_SUCCESS) {

            console.log('Add Device')
            this.state.DeviceData.push(nextProps.AddDevice)


        } else if (nextProps.device_Status == device_Status.device_List.EDIT_SUCCESS) {

            console.log('Edit Device')
            let value = this.state.DeviceData.map((item) => {
                if (item._id === nextProps.EditDevice._id) {
                    console.log('here is search value of Array', item)
                    let index = this.state.DeviceData.indexOf(item)
                    console.log('this is final index', index)
                    this.state.DeviceData[index] = nextProps.EditDevice


                }
            })



        } else if (nextProps.device_Status == device_Status.device_List.DELETE_SUCCESS) {

            console.log('Delete Device')
            let value = this.state.DeviceData.map((item) => {
                if (item._id === nextProps.DeleteDevice._id) {
                    console.log('here is search value of Array', item)
                    let index = this.state.DeviceData.indexOf(item)
                    console.log('this is final index', index)
                    this.state.DeviceData.splice(index, 1)


                }
            })


        } else {
            console.log('else')
        }
    }


    handleFileUploadEdit(event) {
        let reader = new FileReader();
        let file = event.target.files[0];

        var fileName = document.getElementById("profileImageedit").value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            reader.onload = () => {
                this.setState({
                    imageUrl: reader.result,
                    DeviceImage: file
                })
                console.log("This is preview path");
                console.log(reader.result);
                console.log(file);
            }

            reader.readAsDataURL(file)
        } else {

            alert("Only jpg/jpeg and png files are allowed!");
        }
    }
    handleName(event) {
        this.setState({
            deviceName: event.target.value
        })
    }
    handleCost(event) {
        this.setState({
            cost: event.target.value
        })
    }
    handleExpiry(event) {
        this.setState({
            expiry: event.target.value
        })
    }
    handleWarranty(event) {
        this.setState({
            warranty: event.target.value
        })
    }

    handleEdit = (item) => {
        this.setState({
            isEditableMode: !this.state.isEditableMode,
            editingPoint: item,
            deviceName: item.deviceName,
            cost: item.cost,
            expiry: item.expiry,
            warranty: item.warranty,
            imageUrl: item.imageUrl,
        })
    }

    handlesave = (item) => {

        var flag = (this.state.deviceName == '' || this.state.cost == '' || this.state.expiry == '' || this.state.warranty == '')
        if (flag) {
            this.setState({
                ErrorMessage: 'Please fill all fields',
            })
        } else if (this.state.DeviceImage == undefined) {
            this.setState({
                ErrorMessage: 'Please select image',
            })
        }
        else {
            this.setState({
                ErrorMessage: '',
                deviceName: '',
                cost: '',
                expiry: '',
                warrenty: '',
                DeviceImage: '',
                isEditableMode: false
            })
            console.log('image', this.state.DeviceImage)
            let deviceData = {
                deviceName: this.state.deviceName,
                cost: this.state.cost,
                expiry: this.state.expiry,
                warranty: this.state.warranty,
                imageUrl: this.state.DeviceImage,
                id: item._id
            }
            console.log('her is modified Device', deviceData)
            this.props.handleUpdateDevice(deviceData)
        }


    }
    renderEditView = () => {
        return this.state.DeviceData.map((item) => (
            item.deviceName == this.state.editingPoint.deviceName ? (

                <Card >
                    <Grid container >
                        <Grid item lg={8}>
                            <CardContent>
                                <TextField
                                    id="deviceName"
                                    defaultValue="Bare"
                                    margin="normal"
                                    placeholder='Device Name'
                                    label='Device Name'
                                    variant="outlined"
                                    value={this.state.deviceName}
                                    onChange={this.handleName}
                                />
                                <TextField
                                    id="cost"
                                    defaultValue="Bare"
                                    margin="normal"
                                    placeholder='Cost'
                                    label='Cost'
                                    variant="outlined"
                                    value={this.state.cost}
                                    onChange={this.handleCost}
                                />
                                <TextField
                                    id="expiry"
                                    defaultValue="Bare"
                                    margin="normal"
                                    placeholder='Expiry'
                                    label='Expiry'
                                    variant="outlined"
                                    value={this.state.expiry}
                                    onChange={this.handleExpiry}
                                />
                                <TextField
                                    id="warranty"
                                    defaultValue="Bare"
                                    margin="normal"
                                    placeholder='Warranty'
                                    label='Warranty'
                                    variant="outlined"
                                    value={this.state.warranty}
                                    onChange={this.handleWarranty}
                                />
                            </CardContent>
                            <Typography style={{ color: 'red' }} >{this.state.ErrorMessage}</Typography>
                            <CardActions>
                                <Button type='submit' onClick={() => this.handlesave(item)} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                                    SAVE
                                </Button>

                            </CardActions>
                        </Grid>
                        <Grid item lg={4} >
                            <img style={{ maxWidth: '206px', maxWidth: '206px', width: '206px', height: '206px' }} src={this.state.imageUrl} />

                            <div>
                                <input
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    //className={classes.input}
                                    id="profileImageedit"
                                    type="file"
                                    onChange={this.handleFileUploadEdit}
                                />
                                <label htmlFor="profileImageedit">
                                    <Button onClick={this.uploadHandleredit} component="span" variant="raised" style={{ width: '206px', marginTop: '10px' }} color="default">
                                        Upload
                                <FileUpload />
                                    </Button>
                                </label>
                            </div>
                        </Grid>
                    </Grid>

                </Card>
            ) :
                (
                    <Card >
                        <Grid container >
                            <Grid item lg={8}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.deviceName}
                                    </Typography>
                                    <Typography component="p">
                                        Cost : {item.cost}
                                    </Typography>
                                    <Typography component="p">
                                        Expiry : {item.expiry}
                                    </Typography>
                                    <Typography component="p">
                                        Warranty : {item.warranty}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <IconButton onClick={() => this.handleEdit(item)} aria-label="Edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => this.handleDelete(item._id)} aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Grid>
                            <Grid item lg={4} >
                                <img style={{ maxWidth: '206px', maxWidth: '206px', width: '206px', height: '206px' }} src={item.imageUrl} />
                            </Grid>
                        </Grid>



                    </Card>
                )

        ));
    }
    renderDefaultView = () => {
        return (
            this.state.DeviceData.length == 0 ?
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
                    this.state.DeviceData.map((item) => {
                        return (
                            <Card >
                                <Grid container >
                                    <Grid item lg={8}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.deviceName}
                                            </Typography>
                                            <Typography component="p">
                                                Cost : {item.cost}
                                            </Typography>
                                            <Typography component="p">
                                                Expiry : {item.expiry}
                                            </Typography>
                                            <Typography component="p">
                                                Warranty : {item.warranty}
                                            </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <IconButton onClick={() => this.handleEdit(item)} aria-label="Delete">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => this.props.handleDelete(item._id)} aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Grid>
                                    <Grid item lg={4} >
                                        <img style={{ maxWidth: '206px', maxWidth: '206px', width: '206px', height: '206px' }} src={item.imageUrl} />
                                    </Grid>
                                </Grid>



                            </Card>



                        )
                    })
                )

        )
    }




    render() {
        const { classes } = this.props;

        return (

            this.state.isEditableMode ?
                (<div>
                    <Device_Add handleAddDevice={this.props.handleAddDevice} />
                    {this.renderEditView()}
                </div>
                )
                :
                (<div>

                    <Device_Add handleAddDevice={this.props.handleAddDevice} />

                    {this.renderDefaultView()}
                </div>
                )

        )

    }
}


export default Device_List;
