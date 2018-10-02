export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;
    case 'LOGOUT_SUCCESS':
      return {
        items: ''
      };
    default:
      return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading;
    case 'LOGOUT_SUCCESS':
      return {
        items: ''
      };
    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items;
    case 'LOGOUT_SUCCESS':
      return {
        items: ''
      };
    default:
      return state;
  }
}
