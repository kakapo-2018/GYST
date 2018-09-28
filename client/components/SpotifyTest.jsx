import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

//styles

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const spotifyApi = new SpotifyWebApi();
const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});
class SpotifyTest extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getPlaylist() {
    spotifyApi.getUserPlaylists().then(playlist => {
      console.log(playlist);
      spotifyApi;
      this.setState({
        myPlaylist: playlist
      });
      console.log(this.state);
    });
  }

  nextSong() {
    spotifyApi.skipToNext().then(response => {
      spotifyApi.getMyCurrentPlaybackState().then(response => {
        console.log(response);

        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      });
    });
  }

  previousSong() {
    spotifyApi.skipToPrevious().then(response => {
      spotifyApi.getMyCurrentPlaybackState().then(response => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: response.item.artists[0].name,
            albumArt: response.item.album.images[0].url
          }
        });
      });
    });
  }
  render() {
    const { classes, theme } = this.props;
    return (
      <div className="ok">
        {!this.state.loggedIn && (
          <a href="http://localhost:3000/login"> Login to Spotify </a>
        )}
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => this.getPlaylist()}>Check playlist</button>
        )}
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">
                {this.state.nowPlaying.name}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                {this.state.nowPlaying.artist}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton
                onClick={() => this.previousSong()}
                aria-label="Previous"
              >
                {theme.direction === 'rtl' ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton aria-label="Play/pause">
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
              <IconButton onClick={() => this.nextSong()} aria-label="Next">
                {theme.direction === 'rtl' ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={this.state.nowPlaying.albumArt}
            // title={this.state.name}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SpotifyTest);
