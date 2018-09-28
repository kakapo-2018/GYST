const request = require('superagent');

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
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}

export function saveItemAction(saved, goal, id) {
  let obj = { saved, goal, id };
  return dispatch => {
    dispatch(itemsIsLoading(true));
    return request
      .post('/api/v1/savings', obj)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));

        return response.body;
      })
      .then(items => dispatch(itemsFetchDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function getItemAction(id) {
  let obj = { id };
  return dispatch => {
    dispatch(getitemsIsLoading(true));
    return request
      .get('/api/v1/savings', obj)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(getitemsIsLoading(false));

        return response.body;
      })
      .then(items => dispatch(itemsFetchDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function getitemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}
