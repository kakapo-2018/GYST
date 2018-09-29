import request from '../utils/api';

//getting insta for a user

export function getInsta(id) {
  let obj = { id: id };
  return function(dispatch) {
    request('get', '/insta', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(recieveInsta(response.body));
      }
    });
  };
}

//function that returns the insta items to redux
function recieveInsta(response) {
  return {
    type: 'GET_INSTA',
    isFetching: false,
    insta: response
  };
}

//adding insta playlist

export function addInsta(link, id) {
  let obj = { url: link, id: id };
  return function(dispatch) {
    request('post', '/insta/save', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(recieveInsta(response.body));
      }
    });
  };
}
