import { combineReducers } from 'redux';

import auth from './auth';
import { items, itemsHasErrored, itemsIsLoading } from './example_reducer';

export default combineReducers({
  auth,
  items,
  itemsHasErrored,
  itemsIsLoading
});
