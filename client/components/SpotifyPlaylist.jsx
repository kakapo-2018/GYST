import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { addSpotifyAction, getSpotifyAction } from '../actions/spotify';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';

class SpotifyPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputURI: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.props.getPlaylist(this.props.state.auth.user.id);
  }

  handleChange(e) {
    this.setState({
      inputURI: e.target.value
    });
  }

  handleRefresh() {
    this.setState({
      inputURI: ''
    });
    this.props.getPlaylist(this.props.state.auth.user.id);
  }

  handleClick() {
    this.setState({
      inputURI: ''
    });
    this.props.addPlaylist(this.state.inputURI, this.props.state.auth.user.id);
  }

  render() {
    return (
      <Card style={{ minHeight: '100%' }}>
        <div className="we">
          {!this.props.spotify.spotify && <p>Loading...</p>}
          {this.props.spotify.spotify && (
            <iframe
              src={`https://open.spotify.com/embed/playlist/${
                this.props.spotify.spotify[
                  Math.floor(Math.random() * this.props.spotify.spotify.length)
                ]
              }`}
              width="100%"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          )}
          <TextField
            style={{ margin: '10px' }}
            id="standard-textarea"
            label="Enter playlist embed URI"
            placeholder="URI embed link"
            multiline
            name="spotify"
            margin="normal"
            value={this.state.inputURI}
            onChange={this.handleChange}
          />
          <Button
            style={{ margin: '10px' }}
            onClick={this.handleClick}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Button>
          <Button
            style={{ margin: '10px' }}
            onClick={this.handleRefresh}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <Refresh />
          </Button>
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    spotify: state.spotify
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaylist: id => {
      dispatch(getSpotifyAction(id));
    },
    addPlaylist: (uri, id) => {
      dispatch(addSpotifyAction(uri, id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyPlaylist);
