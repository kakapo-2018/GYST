import request from '../utils/api';

//getting weight info for a user

export function getWeightAction(id) {
  let obj = { id: id };
  return function(dispatch) {
    dispatch(gettingWeights());
    request('get', '/weight', obj).then(response => {
      if (!response.ok) {
      } else {
        let mappedWeight = response.body.map(data => {
          return [String(data.date), data.kg];
        });
        mappedWeight.unshift(['Date', 'Weight']);
        dispatch(recieveWeight(mappedWeight));
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

function setWeight(response) {
  return {
    type: 'SET_WEIGHT',
    isFetching: false,
    weight: response
  };
}

function gettingWeights() {
  return {
    type: 'LOADING_WEIGHT',
    isFetching: true
  };
}

//adding weight info

export function saveWeightAction(weight, date, id) {
  let obj = { weight, date, id };
  return function(dispatch) {
    dispatch(gettingWeights());
    request('post', '/weight/save', obj).then(response => {
      if (!response.ok) {
      } else {
        let mappedWeight = response.body.map(data => {
          return [String(data.date), data.kg];
        });
        mappedWeight.unshift(['Date', 'Weight']);
        dispatch(setWeight(mappedWeight));
      }
    });
  };
}
