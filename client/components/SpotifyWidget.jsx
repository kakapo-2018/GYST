import React, { Component } from "react";
import SpotifyPlayer from "react-spotify-player";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
  card: {
    backgroundColor: "black",
    maxWidth: 275,
    margin: 0,
    padding: 0
  },
  style: {
    display: "flex",
    justifyContent: "center",
    padding: 0,
    margin: 0
  },
  view: "list",
  theme: "black",
  widget: {
    padding: 0,
    margin: 0
  }
};

function SpotifyWidget(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent style={{ padding: 0 }} className={classes.style}>
        <SpotifyPlayer
          className={classes.widget}
          uri="spotify:playlist:4dPMKxqQQB7CuOe28Vrcje"
          size={{
            width: "100%",
            height: 300
          }}
          view={styles.view}
          theme={styles.theme}
          allow="encrypted-media"
        />
      </CardContent>
    </Card>
  );
}

SpotifyWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpotifyWidget);
