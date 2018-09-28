import React, { Component } from 'react';

//React-grid
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

//Material-UI
import { withStyles } from '@material-ui/core/styles';

//Components
import SpotifyPlaybackWidget from './SpotifyPlaybackWidget';
import DateTime from './DateTime';
import WorldMap from './WorldMap';
import Gauge from './Gauge';
import Fitness from './Fitness';
import TodoMain from './TodoMain';
import RSS from './RssFeed';
import Weather from './Weather';
import MapContainer from './MapContainer';
import GithubIssues from './GithubIssues';
const drawerWidth = 240;

const styles = theme => ({
  content: {
    paddingLeft: '255px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
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
      todos: [{ id: '1', task: 'lol', checked: false }]
    };
  }
  render() {
    const { classes, theme } = this.props;
    // {console.log(this.props.showCom.weather)}
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ResponsiveGridLayout
          draggableCancel="input,textarea,img"
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          <div
            key="1"
            data-grid={{ x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2, maxH: 2 }}
          >
            {this.props.showCom.spotify && <SpotifyPlaybackWidget />}
          </div>
          <div key="3" data-grid={{ x: 0, y: 0, w: 2, h: 1, maxW: 2, maxH: 1 }}>
            {this.props.showCom.date && <DateTime />}
          </div>
          <div key="4" data-grid={{ x: 0, y: 0, w: 2, h: 2 }}>
            {this.props.showCom.saving && <Gauge />}
          </div>
          <div key="5" data-grid={{ x: 0, y: 0, w: 2, h: 2 }}>
            {this.props.showCom.food && <Fitness />}
          </div>

          <div key="6" data-grid={{ x: 0, y: 0, w: 4, h: 2, minW: 4, minH: 2 }}>
            {this.props.showCom.weather && <Weather />}
          </div>

          <div key="7" data-grid={{ x: 0, y: 0, w: 4, h: 2, minW: 4, minH: 2 }}>
            {this.props.showCom.todo && <TodoMain />}
          </div>
          <div key="8" data-grid={{ x: 0, y: 0, w: 3, h: 1, minW: 3, minH: 1 }}>
            {this.props.showCom.github && <GithubIssues />}
          </div>
          <div key="9" data-grid={{ x: 0, y: 0, w: 4, h: 2, minW: 4, minH: 2 }}>
            {this.props.showCom.rss && <RSS />}
          </div>
          <div
            key="10"
            data-grid={{ x: 0, y: 0, w: 4, h: 2, minW: 4, minH: 2 }}
          >
            {this.props.showCom.worldmap && <WorldMap />}
          </div>
          <div
            key="11"
            data-grid={{ x: 0, y: 0, w: 4, h: 2, minW: 4, minH: 2 }}
          >
            {this.props.showCom.googlemap && <MapContainer />}
          </div>
        </ResponsiveGridLayout>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
