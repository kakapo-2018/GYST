import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  card: {
    backgroundColor: 'black',
    maxWidth: 275,
    margin: 0,
    padding: 0
  },
  style: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  view: 'list',
  theme: 'black',
  widget: {
    padding: 0,
    margin: 0
  }
};

function SpotifyWidget(props) {
  const { classes } = props;

  return (
    <Paper
      style={{
        paddingTop: '15px',
        maxWidth: '100%',
        maxHeight: '100%',
        minWidth: '100%',
        minHeight: '100%'
      }}
    >
      <SpotifyPlayer
        className={classes.widget}
        uri="spotify:user:cottonsnugs:playlist:4dPMKxqQQB7CuOe28Vrcje"
        size={{
          width: '100%',
          height: 280
        }}
        view={styles.view}
        theme={styles.theme}
        allow="encrypted-media"
      />
    </Paper>
  );
}

SpotifyWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpotifyWidget);
