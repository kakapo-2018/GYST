import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileImage } from '../actions/login';
//React-grid
import { Responsive, WidthProvider } from 'react-grid-layout';
import { get, set } from '../utils/localStorage';
const ResponsiveGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};

//Material-UI
import { withStyles } from '@material-ui/core/styles';

//Components
import SpotifyPlaybackWidget from './SpotifyPlaybackWidget';
import SpotifyPlaylist from './SpotifyPlaylist';
import DateTime from './DateTime';
import WorldMap from './WorldMap';
import Gauge from './Gauge';
import Fitness from './Fitness';
import TodoMain from './TodoMain';
import RSS from './RssFeed';
import Weather from './Weather';
import MapContainer from './MapContainer';
import GithubIssues from './GithubIssues';
import Weight from './Weight';
import SocialFeed from './SocialFeed';
import Alarm from './Alarm';
import Language from './Language';
import Gmail2 from './GmailV2';
import ColorSetting from './ColorSetting';
import EventList from './EventList';

const drawerWidth = 240;

const styles = theme => ({
  content: {
    paddingLeft: '255px',
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      background: get('bgcolor') || 'white'
    };
  }

  componentDidMount() {
    this.props.state.auth.user.id
      ? this.props.getProfileImage(this.props.state.auth.user.id)
      : null;
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  handleChange = color => {
    this.setState({ background: color.hex });
  };

  render() {
    set('bgcolor', this.state.background);

    const { classes, theme } = this.props;
    const bgColor = get('bgcolor');
    return (
      <main style={{ backgroundColor: bgColor }} className={classes.content}>
        <div className={classes.toolbar} />
        <ResponsiveGridLayout
          className="layout"
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          draggableCancel="input,textarea,img"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {this.props.showCom.spotify ? (
            <div
              key="1"
              data-grid={{
                x: 2,
                y: 2,
                w: 2,
                h: 1,
                minW: 2,
                maxW: 3,
                maxH: 1,
                minH: 1
              }}
            >
              <SpotifyPlaybackWidget />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.date ? (
            <div
              key="2"
              data-grid={{
                x: 0,
                y: 0,
                w: 2,
                h: 1,
                minH: 1,
                maxH: 3,
                minW: 2,
                maxW: 4
              }}
            >
              <DateTime />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.alarm ? (
            <div
              key="3"
              data-grid={{
                x: 0,
                y: 1,
                w: 2,
                h: 3,
                minW: 2,
                maxW: 3,
                minH: 3,
                maxH: 3
              }}
            >
              <Alarm />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.saving ? (
            <div
              key="4"
              data-grid={{
                x: 8,
                y: 3,
                w: 3,
                h: 2,
                minW: 3,
                maxW: 4,
                maxH: 2,
                minH: 2
              }}
            >
              <Gauge />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.food ? (
            <div
              key="5"
              data-grid={{
                x: 3,
                y: 3,
                w: 3,
                h: 2,
                minW: 3,
                maxW: 6,
                minH: 2,
                maxH: 2
              }}
            >
              <Fitness />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.weather ? (
            <div
              key="6"
              data-grid={{
                x: 9,
                y: 0,
                w: 4,
                h: 2,
                minW: 4,
                maxW: 8,
                minH: 2,
                maxH: 4
              }}
            >
              <Weather />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.todo ? (
            <div
              key="7"
              data-grid={{
                x: 3,
                y: 5,
                w: 4,
                h: 2,
                minW: 4,
                maxW: 8,
                minH: 2,
                maxH: 6
              }}
            >
              <TodoMain />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.github ? (
            <div
              key="8"
              data-grid={{ x: 2, y: 0, w: 2, h: 1, maxW: 2, maxH: 1 }}
            >
              <GithubIssues />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.rss ? (
            <div
              key="9"
              data-grid={{
                x: 9,
                y: 3,
                w: 4,
                h: 2,
                minW: 4,
                maxW: 8,
                minH: 2,
                maxH: 4
              }}
            >
              <RSS />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.worldmap ? (
            <div
              key="10"
              data-grid={{
                x: 9,
                y: 7,
                w: 4,
                h: 2,
                minW: 4,
                maxW: 8,
                minH: 2,
                maxH: 6
              }}
            >
              <WorldMap />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.googlemap ? (
            <div
              key="11"
              data-grid={{
                x: 9,
                y: 5,
                w: 4,
                h: 2,
                minW: 4,
                maxW: 12,
                minH: 2,
                maxH: 8
              }}
            >
              <MapContainer />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.weight ? (
            <div
              key="12"
              data-grid={{
                x: 3,
                y: 9,
                w: 4,
                h: 2,
                minW: 4,
                maxW: 6,
                minH: 2,
                maxH: 2
              }}
            >
              <Weight />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.spotifyplaylist ? (
            <div
              key="13"
              data-grid={{
                x: 0,
                y: 5,
                w: 2,
                h: 3,
                minW: 2,
                maxW: 6,
                maxH: 4,
                minH: 3
              }}
            >
              <SpotifyPlaylist />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.instagram ? (
            <div
              key="14"
              data-grid={{
                x: 9,
                y: 9,
                w: 4,
                h: 3,
                minW: 4,
                maxW: 8,
                minH: 2,
                maxH: 6
              }}
            >
              <SocialFeed />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.color ? (
            <div
              key="15"
              data-grid={{
                x: 0,
                y: 9,
                w: 2,
                h: 1,
                minW: 1,
                maxW: 8,
                minH: 1,
                maxH: 2
              }}
            >
              <ColorSetting
                background={this.state.background}
                handleChange={this.handleChange}
              />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.gmail2 ? (
            <div
              key="16"
              data-grid={{
                x: 3,
                y: 7,
                w: 3,
                h: 2,
                minW: 3,
                maxW: 8,
                maxH: 6,
                minH: 2
              }}
            >
              <Gmail2 />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.language ? (
            <div
              key="17"
              data-grid={{
                x: 4,
                y: 0,
                w: 4,
                h: 2,
                minW: 4,
                maxW: 8,
                maxH: 2,
                minH: 2
              }}
            >
              <Language />
            </div>
          ) : (
            <React.Fragment />
          )}
          {this.props.showCom.calendar ? (
            <div
              key="18"
              data-grid={{
                x: 6,
                y: 7,
                w: 3,
                h: 2,
                minW: 3,
                maxW: 8,
                maxH: 6,
                minH: 2
              }}
            >
              <EventList />
            </div>
          ) : (
            <React.Fragment />
          )}
        </ResponsiveGridLayout>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfileImage: id => {
      dispatch(getProfileImage(id));
    }
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value
      })
    );
  }
}
