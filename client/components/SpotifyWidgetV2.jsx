import React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import { addSpotifyAction, getSpotifyAction } from '../actions/spotify';

class SpotifyWidgetV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: true,
      showPlaylist: false,
      inputURI: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    console.log('hit');
    this.setState({
      inputURI: e.target.value
    });
  }

  handleClick() {
    console.log('clicked');
    console.log(this.state);
    this.setState({
      showInput: false,
      showPlaylist: true
    });
    this.props.addPlaylist(this.state.inputURI, this.props.state.auth.user.id);
  }

  render() {
    return (
      <div>
        {this.state.showInput && (
          <div>
            <Input
              style={{ maxWidth: '45%' }}
              type="text"
              name="spotify"
              placeholder="Enter Playlist URI"
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>save</button>
          </div>
        )}
        {this.state.showPlaylist && (
          <div className="we">
            <iframe
              src="https://open.spotify.com/embed/playlist/6JCWxtu3J9pdFzIVeAbQ8B"
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </div>
        )}
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
)(SpotifyWidgetV2);
