import { combineReducers } from 'redux';

import { items, itemsHasErrored, itemsIsLoading } from './example_reducer';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading
});
