import React, { Component } from "react";
import SpotifyPlayer from "react-spotify-player";
import "./App.css";

class SpotifyWidget extends Component {
  constructor() {
    super();
    this.state = {
      size: {
        width: "20%",
        height: 300
      },
      view: "list",
      theme: "black"
    };
  }

  render() {
    return (
      <div className="App">
        <SpotifyPlayer
          uri="spotify:playlist:4dPMKxqQQB7CuOe28Vrcje"
          size={this.state.size}
          view={this.state.view}
          theme={this.state.theme}
          allow="encrypted-media"
        />
      </div>
    );
  }
}

export default SpotifyWidget;
