import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
//styles
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Pause from '@material-ui/icons/Pause';
import Button from '@material-ui/core/Button';

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
    paddingLeft: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  },
  button: {
    margin: theme.spacing.unit,
    textDecoration: 'none'
  }
});

class SpotifyPlaybackWidget extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Listening to', albumArt: '' },
      paused: false
    };
  }

  componentDidMount() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
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
      spotifyApi;
      this.setState({
        myPlaylist: playlist
      });
    });
  }

  getSong() {
    spotifyApi.getMyCurrentPlayingTrack().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  nextSong() {
    spotifyApi.skipToNext().then(response => {
      setTimeout(() => {
        this.getSong();
      }, 800);
    });
  }

  previousSong() {
    spotifyApi.skipToPrevious().then(response => {
      setTimeout(() => {
        this.getSong();
      }, 800);
    });
  }

  togglePause() {
    this.state.paused
      ? spotifyApi.play().then(response => {
          this.setState({
            paused: !this.state.paused
          });
        })
      : spotifyApi.pause().then(response => {
          this.setState({
            paused: !this.state.paused
          });
        });
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className="ok">
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              {!this.state.loggedIn && (
                <Button
                  variant="outlined"
                  href="http://gyst-dash.herokuapp.com/login"
                  className={classes.button}
                >
                  Login to Spotify
                </Button>
              )}
              {this.state.loggedIn && (
                <React.Fragment>
                  <Typography variant="headline">
                    {this.state.nowPlaying.name}
                  </Typography>

                  <Typography variant="subheading" color="textSecondary">
                    {this.state.nowPlaying.artist}
                  </Typography>
                </React.Fragment>
              )}
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
                {this.state.paused && (
                  <Pause
                    onClick={() => {
                      this.togglePause();
                    }}
                    className={classes.playIcon}
                  />
                )}
                {!this.state.paused && (
                  <PlayArrowIcon
                    className={classes.playIcon}
                    onClick={() => {
                      this.togglePause();
                    }}
                  />
                )}
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
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SpotifyPlaybackWidget);
