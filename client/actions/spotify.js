import request from '../utils/api';

//getting todos for a user

export function getSpotifyAction(id) {
  let obj = { id: id };
  return function(dispatch) {
    request('get', '/spotify', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(receiveTodos(response.body));
      }
    });
  };
}

//function that returns the todo items from the db into redux
function recievePlaylist(response) {
  return {
    type: 'GET_PLAYLIST',
    isFetching: false,
    spotify: response
  };
}

//adding todos

export function addSpotifyAction(link, id) {
  let obj = { url: link, id: id };
  return function(dispatch) {
    request('post', '/spotify/save', obj).then(response => {
      if (!response.ok) {
        console.log('broken');
      } else {
        console.log(response.body);

        let alteredResponse = response.body.map(playlist => {
          let splitArr = playlist.uri.split(':');
          let miniArr = splitArr[3] + ':' + splitArr[4];
          console.log(miniArr);

          let string = splitArr.join();
          return string;
        });

        // let split = response.body[].uri.split(':');
        console.log(alteredResponse);

        dispatch(recievePlaylist(split));
      }
    });
  };
}
