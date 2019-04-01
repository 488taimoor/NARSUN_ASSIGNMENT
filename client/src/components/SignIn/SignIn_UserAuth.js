import React from 'react';

import { Typography, Grid, TextField, Button, Hidden } from '@material-ui/core';
import validator from 'validator';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            ErrorMsgEmail: false,
            emailFlag: false,
            UserHelperText: '',

        };
        this.handlEmail = this.handlEmail.bind(this);
    }

    handlEmail(event) {
        ((validator.isAlphanumeric(event.target.value) || (event.target.value === '')) ?
            this.setState({
                emailFlag: false,
                UserHelperText: '',
                ErrorMsgEmail: false
            })
            :
            this.setState({
                emailFlag: true,
                UserHelperText: 'Please enter valid username',
                ErrorMsgEmail: true
            })
        )

        this.setState({ email: event.target.value });
    }
    handleUname = () => {
        this.props.Authuser(this.state.email)
    }
    componentWillMount() {
        //error message handle
        if (this.props.UserAutherror == '' || this.props.UserAutherror == undefined) {
            this.setState({
                emailFlag: false,
                UserHelperText: '',
                ErrorMsgEmail: false
            })
        } else {
            this.setState({
                emailFlag: true,
                UserHelperText: 'Please enter valid username',
                ErrorMsgEmail: true
            })
        }
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
                                            error={this.state.ErrorMsgEmail}
                                            placeholder="admin"
                                            value={this.state.email}
                                            onChange={this.handlEmail}
                                            helperText={this.state.UserHelperText}
                                            label="User Name" margin="normal"

                                        />
                                    </Grid>
                                    <Grid container justify='flex-end' item lg={10} >
                                        <Button type='submit' onClick={this.handleUname} size='small' variant='raised' style={{ color: 'white' }} color='primary'>
                                            Next
                                    </Button>
                                    </Grid>
                                </Grid>



                            </CardActions>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>

                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}

export default LoginForm
