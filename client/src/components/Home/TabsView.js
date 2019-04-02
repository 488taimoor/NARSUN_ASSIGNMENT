import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Devices_View from './Devices/Devices_View'
import Users_View from './Users/Users_View';
import Grid from '@material-ui/core/Grid';
import SettingsTabs from './Settings/SettingsTabs'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Grid container justify='center' style={{ height: '87vh' }}>
          <Grid item lg={8} sm={10} xs={10}>
            <Grid contianer alignItems='center'>
              <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange} centered={true}>
                  <Tab label="Devices" />
                  <Tab label="Users" />
                  <Tab label="Settings" />
                </Tabs>
              </AppBar>
              {value === 0 && <TabContainer><Devices_View /></TabContainer>}
              {value === 1 && <TabContainer><Users_View /></TabContainer>}
              {value === 2 && <TabContainer><SettingsTabs /></TabContainer>}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);

