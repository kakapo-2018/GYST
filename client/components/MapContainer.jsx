import React from 'react';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const style = {
  maxWidth: '100%',
  maxHeight: '100%',
  minWidth: '100%',
  minHeight: '100%'
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 18.486278764986732, lng: 69.92786525735443 }
    };
    this.mapClicked = this.mapClicked.bind(this);
  }

  mapClicked(props, map, e) {
    let location = this.state.position;
    location.lat = e.latLng.lat();
    location.lng = e.latLng.lng();

    this.setState({
      position: location
    });
  }

  render() {
    return (
      <Map
        onClick={this.mapClicked}
        style={style}
        google={this.props.google}
        zoom={14}
      >
        {/* <Marker onClick={this.onMarkerClick} name={"Current location"} /> */}
        <Marker
          position={{
            lat: this.state.position.lat,
            lng: this.state.position.lng
          }}
          name={'Current location'}
        />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDJKV1bs7RogqpcMvvSuSLTDPB19lPR5dI'
})(MapContainer);
