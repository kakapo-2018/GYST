import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import { addSpotifyAction, getSpotifyAction } from '../actions/spotify';

class SpotifyPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputURI: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getPlaylist(this.props.state.auth.user.id);
  }

  handleChange(e) {
    this.setState({
      inputURI: e.target.value
    });
  }

  handleClick() {
    // this.setState({
    //   showInput: false,
    //   showPlaylist: true
    // });
    this.props.addPlaylist(this.state.inputURI, this.props.state.auth.user.id);
  }

  render() {
    return (
      <div>
        <div className="we">
          {this.props.spotify.spotify && (
            <iframe
              src={`https://open.spotify.com/embed/playlist/${
                this.props.spotify.spotify[
                  Math.floor(Math.random() * this.props.spotify.spotify.length)
                ]
              }`}
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          )}
          <Input
            style={{ maxWidth: '45%' }}
            type="text"
            name="spotify"
            placeholder="Enter Playlist URI"
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>save</button>
        </div>
      </div>
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
