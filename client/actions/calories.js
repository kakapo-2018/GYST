import request from '../utils/api';

//function that returns the weight info to redux
function setCals(response) {
  return {
    type: 'SET_CALORIES',
    isFetching: false,
    totalcalories: response
  };
}

function getCals(response) {
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
        dispatch(setCals(response.body));
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
        console.log(response.body.calories);
        dispatch(getCals(response.body.calories));
      }
    });
  };
}
