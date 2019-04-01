import React from 'react';

import { Typography, Grid, TextField, Button, Hidden } from '@material-ui/core';
import validator from 'validator';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


class SignIn_PassAuth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            ErrorMsgPas: false,
            PassHelperText: '',
            passwordFlag: false,
            
        };
        this.handlPassword = this.handlPassword.bind(this);
        
    }

    
    handlPassword(event) {
        if (!validator.isEmpty(event.target.value)) {
            this.setState({
                passwordFlag: false,
                PassHelperText: '',
                ErrorMsgPas: false
            })
        } else {
            this.setState({
                passwordFlag: true,
                PassHelperText: 'Enter your password',
                ErrorMsgPas: true
            })
        }

        this.setState({ password: event.target.value });
    }
    handlePass = () =>{
        this.props.AuthPass(this.state.password, this.props.userData.data.username)
    }
    componentWillMount(){
        //error message handle
        if(this.props.PassAutherror=='' || this.props.PassAutherror==undefined){
            this.setState({
                passwordFlag: false,
                PassHelperText: '',
                ErrorMsgPas: false
            })
        }else{
            this.setState({
                passwordFlag: true,
                PassHelperText: 'Enter valid Pin code',
                ErrorMsgPas: true
            })
        }
    }
    componentDidMount(){
        //to see pin in console
        console.log('======================================')
        console.log('UserNmae:', this.props.userData.data.username)
        console.log('Pin:', this.props.userData.data.password)
        console.log('======================================')
    }

    render() {
        //incase wrong Email or password
        var errorMessage = (this.props.status != undefined && this.props.status == "LOGIN_ACCOUNT_NOT_AUTHORIZED") ? "Email or password is incorrect" : ""

        return (

            <Grid container alignItems='center' justify='center' style={{ height: '87vh' }}>
                <Grid item lg={4} sm={10} xs={10}>
                    <Grid contianer alignItems='center'>

                        <Card >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    NARSUN's Assignment
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container alignItems='center' justify='center'>
                                    <Grid item lg={10}>
                                    <TextField fullWidth
                                        error={this.state.ErrorMsgPas}
                                        placeholder="Enter Pin"
                                        type="password"
                                        onChange={this.handlPassword}
                                        value={this.state.password}
                                        helperText={this.state.PassHelperText}
                                        label="Password"
                                        margin="normal" />
                                    </Grid>
                                    <Grid container justify='flex-end' item lg={10} >
                                    <Button type='submit' onClick={this.handlePass} size='small' variant='raised' style={{color:'white'}} color='primary'>
                                        ACCESS
                                    </Button>
                                    </Grid>
                                </Grid>
                                


                            </CardActions>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Please open Browser's console to see Pin Code 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}

export default SignIn_PassAuth
