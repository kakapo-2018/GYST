import request from '../utils/api';

//getting playlist for a user

export function getSpotifyAction(id) {
  let obj = { id: id };
  return function(dispatch) {
    request('get', '/spotify', obj).then(response => {
      if (!response.ok) {
      } else {
        let alteredResponse = response.body.map(playlist => {
          let splitArr = playlist.uri.split(':');
          let playlistURI = splitArr[4];
          return playlistURI;
        });
        dispatch(recievePlaylist(alteredResponse));
      }
    });
  };
}

//function that returns the playlist items to redux
function recievePlaylist(response) {
  return {
    type: 'GET_PLAYLIST',
    isFetching: false,
    spotify: response
  };
}

//adding spotify playlist

export function addSpotifyAction(link, id) {
  let obj = { url: link, id: id };
  return function(dispatch) {
    request('post', '/spotify/save', obj).then(response => {
      if (!response.ok) {
      } else {
        let alteredResponse = response.body.map(playlist => {
          let splitArr = playlist.uri.split(':');
          let playlistURI = splitArr[4];
          return playlistURI;
        });
        dispatch(recievePlaylist(alteredResponse));
      }
    });
  };
}
