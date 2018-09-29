import React from 'react';
// import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WbSunny from '@material-ui/icons/WbSunny';
import Icon from '@material-ui/core/Icon';
import AttachMoney from '@material-ui/icons/AttachMoney';
import QueueMusic from '@material-ui/icons/QueueMusic';
import AccessTime from '@material-ui/icons/AccessTime';
import Web from '@material-ui/icons/Web';
import Fastfood from '@material-ui/icons/Fastfood';
import Map from '@material-ui/icons/Map';
import ReportProblem from '@material-ui/icons/ReportProblem';
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Divider from '@material-ui/core/Divider';
import SwapVert from '@material-ui/icons/SwapVert';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import LinkedCamera from '@material-ui/icons/LinkedCamera';

const styles = theme => ({
  card: {
    backgroundColor: 'transparent',
    color: 'white',
    maxWidth: 275,
    zIndex: '3'
  },
  button: {
    width: 239,
    textAlign: 'center',
    padding: 0
  },
  icon: {
    color: 'white',
    textAlign: 'left',
    marginRight: '2%'
  },
  sub: {
    color: 'white',
    letterSpacing: '2px',
    marginTop: '5%',
    marginBottom: '5%'
  },
  whiten: {
    backgroundColor: 'white'
  },
  scrollbar: {
    height: 550,
    marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
  }
});

class Sidebar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
          <div className={classes.scrollbar}>
      <div className={classes.overflow}>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('weather')}
        >
          <Icon className={classes.icon}>
            <WbSunny />
          </Icon>
          <Typography className={classes.sub}>Weather</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('saving')}
        >
          <Icon className={classes.icon}>
            <AttachMoney />
          </Icon>
          <Typography className={classes.sub}>Saving</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('spotify')}
        >
          <Icon className={classes.icon}>
            <LibraryMusic />
          </Icon>
          <Typography className={classes.sub}>Spotify</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('spotifyplaylist')}
        >
          <Icon className={classes.icon}>
            <QueueMusic />
          </Icon>
          <Typography className={classes.sub}>Spotify Playlist</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('date')}
        >
          <Icon className={classes.icon}>
            <AccessTime />
          </Icon>
          <Typography className={classes.sub}>Date & Time</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('instagram')}
        >
          <Icon className={classes.icon}>
            <LinkedCamera />
          </Icon>
          <Typography className={classes.sub}>Instagram</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('rss')}
        >
          <Icon className={classes.icon}>
            <Web />
          </Icon>
          <Typography className={classes.sub}>RSS</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('food')}
        >
          <Icon className={classes.icon}>
            <Fastfood />
          </Icon>
          <Typography className={classes.sub}>Food Trackr</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('todo')}
        >
          <Icon className={classes.icon}>
            <CheckCircleOutline />
          </Icon>
          <Typography className={classes.sub}>To Do List</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('worldmap')}
        >
          <Icon className={classes.icon}>
            <AirplanemodeActive />
          </Icon>
          <Typography className={classes.sub}>World Map</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('googlemap')}
        >
          <Icon className={classes.icon}>
            <Map />
          </Icon>
          <Typography className={classes.sub}>Google Map</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('github')}
        >
          <Icon className={classes.icon}>
            <ReportProblem />
          </Icon>
          <Typography className={classes.sub}>Github Issues</Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={() => this.props.handleClick('weight')}
        >
          <Icon className={classes.icon}>
            <SwapVert />
          </Icon>
          <Typography className={classes.sub}>Weight Trackr</Typography>
        </Button>
        <Divider className={classes.whiten} />
        </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Sidebar);
