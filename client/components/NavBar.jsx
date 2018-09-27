import React, { Component } from 'react';

//Material-UI
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  }
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, theme } = this.props;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.props.handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ textTransform: 'capitalize' }}
            variant="title"
            color="inherit"
            noWrap
          >
            {this.props.user}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navbar);
