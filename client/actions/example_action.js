const request = require('superagent');

// export function fetchUsers() {
//   return dispatch => {
//     return request.get('/api/ext/duck').then(res => {
//       console.log('action:', res.body);
//       dispatch({
//         type: 'FETCH_USERS',
//         payload: res.body,
//         isLoaded: true
//       });
//     });
//   };
// }

export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  };
}
export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(items) {
  console.log('action', items);
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}

export function itemsFetchData(url) {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    return request
      .get(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response.body.meals;
      })
      .then(items => dispatch(itemsFetchDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}
