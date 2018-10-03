import * as actions from '../../../client/actions/example_action';

test('itemsHasErrored example action creator', () => {
  const bool = true;

  const expected = {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  };

  expect(actions.itemsHasErrored(bool)).toEqual(expected);
});

test('itemsIsLoading example action creator', () => {
  const bool = true;

  const expected = {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };

  expect(actions.itemsIsLoading(bool)).toEqual(expected);
});

test('itemsFetchDataSuccess example action creator', () => {
  const bool = true;
  const item = true;
  const expected = {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items: item
  };

  expect(actions.itemsFetchDataSuccess(bool)).toEqual(expected);
});
