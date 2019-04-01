import React, { Component } from 'react';
import { Typography, Grid, TextField, Button, Hidden } from '@material-ui/core';
import validator from 'validator';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FileUpload from '@material-ui/icons/FileUpload';
import boxImg from '../../img/block.png';
import DatePicker from 'react-datepicker'
import Calendar from 'ciqu-react-calendar'
class Device_Add extends Component {
    constructor(props) {
        super(props);
        this.state = {

            deviceName: '',
            DNameHelperText: '',
            ErrorMsgDeName: false,

            cost: '',
            CostHelperText: '',
            ErrorMsgCost: false,

            warrenty: '',
            WarrentyHelperText: '',
            ErrorMsgWarrenty: false,

            expiry: '',
            ExpiryHelperText: '',
            ErrorMsgExpiry: false,


            imagePreviewUrl: boxImg,
            ErrorMessage: ''
        };
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.handleDName = this.handleDName.bind(this)
        this.handleCost = this.handleCost.bind(this)
        this.handleExpiry = this.handleExpiry.bind(this)
        this.handleWarrenty = this.handleWarrenty.bind(this)
    }
    handleFileUpload(event) {
        let reader = new FileReader();
        let file = event.target.files[0];

        var fileName = document.getElementById("profileImage").value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            reader.onload = () => {
                this.setState({
                    imagePreviewUrl: reader.result,
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



    handleCost(event) {
        ((validator.isNumeric(event.target.value) || (event.target.value === '')) ?
            this.setState({
                CostHelperText: '',
                ErrorMsgCost: false
            })
            :
            this.setState({
                CostHelperText: 'Alfabets are not allowed!',
                ErrorMsgCost: true
            })
        )

        this.setState({ cost: event.target.value });
    }

    handleDName(event) {
        ((validator.isAlphanumeric(event.target.value) && (!validator.contains(event.target.value, ' '))) || (event.target.value === '')) ?
            this.setState({
                DNameHelperText: '',
                ErrorMsgDeName: false
            })
            :
            this.setState({
                DNameHelperText: 'Special characters or spaces are not allowed',
                ErrorMsgDeName: true
            })


        this.setState({ deviceName: event.target.value });
    }

    handleExpiry(value) {
        console.log(value.format('YYYY-MM-DD'))
        this.setState({ expiry: value.format('YYYY-MM-DD') });
    }
    handleWarrenty(event) {
        ((validator.isNumeric(event.target.value) || (event.target.value === '')) ?
            this.setState({
                WarrentyHelperText: '',
                ErrorMsgWarrenty: false
            })
            :
            this.setState({
                WarrentyHelperText: 'Alfabets are not allowed!',
                ErrorMsgWarrenty: true
            })
        )

        this.setState({ warrenty: event.target.value });
    }
    handleSubmit = () => {
        var flag = (this.state.deviceName == '' || this.state.cost == '' || this.state.expiry == '' || this.state.warrenty == '')
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
                DeviceImage: boxImg,
                imagePreviewUrl: boxImg
            })
            console.log('image', this.state.DeviceImage)
            let deviceData = {
                deviceName: this.state.deviceName,
                cost: this.state.cost,
                expiry: this.state.expiry,
                warranty: this.state.warrenty,
                imageUrl: this.state.DeviceImage
            }
            this.props.handleAddDevice(deviceData)
        }

    }
    render() {
        return (
            <div>
                <Grid container direction='row' alignItems='center' justify='space-between'>
                    <Grid item lg={8}>
                        <Grid container >
                            <Grid item lg={6}>
                                <TextField
                                    error={this.state.ErrorMsgDeName}
                                    placeholder="Device Name"
                                    value={this.state.deviceName}
                                    onChange={this.handleDName}
                                    helperText={this.state.DNameHelperText}
                                    label="Device Name" margin="normal"

                                />
                            </Grid>
                            <Grid item lg={6}>
                                <TextField
                                    error={this.state.ErrorMsgCost}
                                    placeholder="40"
                                    value={this.state.cost}
                                    onChange={this.handleCost}
                                    helperText={this.state.CostHelperText}
                                    label="Cost" margin="normal"

                                />
                            </Grid>
                            <Grid item lg={6} >
                            <div style={{marginTop:'40px'}}> 
                            <Calendar
                                onChange={this.handleExpiry}
                                value={this.state.expiry}
                                allowClear={true}
                                disabled={false}
                                placeholder={'please input expiry date'}
                                format={'YYYY-MM-DD'}
                            />
                            </div>
                            </Grid>
                            <Grid item lg={6}><TextField
                                error={this.state.ErrorMsgWarrenty}
                                placeholder="1"
                                value={this.state.warrenty}
                                onChange={this.handleWarrenty}
                                helperText={this.state.WarrentyHelperText}
                                label="Warrenty" margin="normal"

                            /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4}>
                        <Grid container>
                            <Grid item>
                                <img style={{ maxWidth: '206px', maxWidth: '206px', width: '206px', height: '206px' }} src={this.state.imagePreviewUrl} />

                                <div>
                                    <input
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        id="profileImage"
                                        type="file"
                                        onChange={this.handleFileUpload}
                                    />
                                    <label htmlFor="profileImage">
                                        <Button onClick={this.uploadHandler} component="span" variant="raised" style={{ width: '206px', marginTop: '10px' }} color="default">
                                            Upload
                                <FileUpload />
                                        </Button>
                                    </label>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography style={{ color: 'red' }}>{this.state.ErrorMessage}</Typography>
                <Button type='submit' onClick={this.handleSubmit} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                    ADD
                </Button>
            </div>

        );
    }
}

export default Device_Add;