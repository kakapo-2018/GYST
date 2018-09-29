import request from '../utils/api';

//getting weight info for a user

export function getWeightAction(id) {
  let obj = { id: id };
  return function(dispatch) {
    request('get', '/weight', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(recieveWeight(response.body));
      }
    });
  };
}

//function that returns the weight info to redux
function recieveWeight(response) {
  return {
    type: 'GET_WEIGHT',
    isFetching: false,
    weight: response
  };
}

//adding weight info 

export function saveWeightAction(weight, date, id) {
  let obj = { weight, date, id };
  return function(dispatch) {
    request('post', '/weight/save', obj).then(response => {
      if (!response.ok) {
      } else {
      
        dispatch(recieveWeight(response.body));
      }
    });
  };
}
