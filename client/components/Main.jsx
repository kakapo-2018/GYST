import React, { Component } from "react";

//Material-UI
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

//Components
import SpotifyWidget from "./SpotifyWidget";
import DateTime from "./DateTime";
import WorldMap from "./WorldMap";
import Gauge from "./Gauge";
import Fitness from "./Fitness";
import TodoMain from "./TodoMain";
import RSS from "./RssFeed";
import Weather from "./Weather";
import MapContainer from "./MapContainer";

const drawerWidth = 240;

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ id: "1", task: "lol", checked: false }]
    };
  }
  render() {
    const { classes, theme } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography noWrap>
          {"You think water moves fast? You should see ice."}
        </Typography>
        <MapContainer />
        <SpotifyWidget />
        <DateTime />
        <Gauge />
        <Fitness />
        <Weather />
        <TodoMain />

        <RSS />
        <WorldMap />
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
