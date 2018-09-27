import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

//elements
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

//Components
import Main from './Main';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },

  background: {
    position: 'absolute',
    zIndex: '-1',
    height: '100%',
    minHeight: '100vh',

    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      background: '#000',
      opacity: '.8'
    }
  },

  whiten: {
    backgroundColor: 'white'
  },

  avatar: {
    margin: 45
  },
  bigAvatar: {
    width: 150,
    height: 150
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    overflow: 'visible',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class ResponsiveDrawer extends React.Component {
  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider className={classes.whiten} />
        <Avatar
          alt="Remy Sharp"
          src="luke.jpeg"
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
        <div
          className={classes.background}
          style={{ backgroundImage: 'url(' + 'sidebar-4.jpg' + ')' }}
        />
        <Divider className={classes.whiten} />
      </div>
    );

    return (
      <div className={classes.root}>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.props.drawerState}
            onClose={this.props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        {/* Components from main will render here */}
        <Main />
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
