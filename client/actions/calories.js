import request from '../utils/api';

//function that returns the weight info to redux
export function setCals(response) {
  return {
    type: 'SET_CALORIES',
    isFetching: false,
    totalcalories: response
  };
}

export function getCals(response) {
  return {
    type: 'GET_CALORIES',
    isFetching: false,
    totalcalories: response
  };
}

//setting calorie info for a user
export function saveTotalCals(totalcals, id) {
  let obj = { totalcals: totalcals, id: id };
  return function(dispatch) {
    request('post', '/calories/save', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(setCals(response.body.calories));
      }
    });
  };
}

//getting calorie info for a user
export function getTotalCals(id) {
  return function(dispatch) {
    request('get', '/calories/' + id).then(response => {
      if (!response.ok) {
      } else {
        dispatch(getCals(response.body.calories));
      }
    });
  };
}

export function deleteCalories(id) {
  return function(dispatch) {
    request('post', '/calories/delete/' + id).then(response => {
      if (!response.ok) {
      } else {
        dispatch(getCals(response.body.calories));
      }
    });
  };
}
