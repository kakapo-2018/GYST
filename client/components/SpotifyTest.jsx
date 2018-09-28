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
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});
class SpotifyTest extends Component {
  constructor(props) {
    super(props);
    const { classes, theme } = this.props;
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
      spotifyApi
      this.setState({
        myPlaylist: playlist
      });
      console.log(this.state);
    });
  }

  getNowPlaying() {
    spotifyApi.skipToNext().then(response => {
      spotifyApi
      // this.setState({
      //   nowPlaying: {
      //     name: response.item.name,
      //     albumArt: response.item.album.images[0].url
      //   }
      // });
    });
  }
  render() {
    return (
      <div className="ok">
        <a href="http://localhost:3000/login"> Login to Spotify </a>
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
                <Typography variant="headline">Live From Space</Typography>
                <Typography variant="subheading" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="Previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="Play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton onClick={() => this.getNowPlaying()} aria-label="Next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="/static/images/cards/live-from-space.jpg"
              title="Live from space album cover"
            />
          </Card>
        );
      }

      </div>
    );
  }
}

// MediaControlCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(SpotifyTest);
