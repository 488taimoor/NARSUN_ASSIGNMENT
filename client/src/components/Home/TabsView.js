import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import Devices_View from './Devices/Devices_View'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

class TabsView extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Grid container justify='center' style={{ height: '87vh' }}>
        <Grid item lg={8} sm={10} xs={10}>
          <Grid contianer alignItems='center'>

            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                centered={true}
              >
                <Tab label="Devices" />
                <Tab label="Users" />
                <Tab label="Settings" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              {/* device container */}
              <TabContainer dir={theme.direction}>
                <Devices_View />
              </TabContainer>
              {/* user container */}
              <TabContainer dir={theme.direction}>Item Two</TabContainer>
              {/* setting container */}
              <TabContainer dir={theme.direction}>Item Three</TabContainer>
            </SwipeableViews>

          </Grid>
        </Grid>
      </Grid>
      // <div className={classes.root}>

      // </div>
    );
  }
}

TabsView.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TabsView);
