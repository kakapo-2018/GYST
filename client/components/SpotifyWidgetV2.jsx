import React from 'react';
import Input from '@material-ui/core/Input';

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
              src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
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
export default SpotifyWidgetV2;
