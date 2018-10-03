import * as actions from '../../../client/actions/savings';
import nock from 'nock';

test('ITEMS_HAS_ERRORED action creator', () => {
  const fakeResult = 'badRes';
  const expected = {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: fakeResult
  };

  expect(actions.itemsHasErrored(fakeResult)).toEqual(expected);
});

test('ITEMS_IS_LOADING action creator', () => {
  const fakeResult = 'badRes';
  const expected = {
    type: 'ITEMS_IS_LOADING',
    isLoading: fakeResult
  };

  expect(actions.itemsIsLoading(fakeResult)).toEqual(expected);
});

test('ITEMS_FETCH_DATA_SUCCESS action creator', () => {
  const fakeItem = 'badItem';
  const expected = {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items: fakeItem
  };

  expect(actions.itemsFetchDataSuccess(fakeItem)).toEqual(expected);
});

// test('save item action  will dispatch an action on success', () => {
//   const fakeResult = 'badRes';
//   const fakeItem = 'badItem';

//   const scope = nock('http://localhost:80')
//     .post('/api/v1/savings')
//     .reply(200);

//   const expected = {
//     type: 'ITEMS_IS_LOADING',
//     isLoading: fakeResult
//   };
//   const secondExpected = {
//     type: 'ITEMS_IS_LOADING',
//     isLoading: fakeResult
//   };
//   const thirdExpected = {
//     type: 'ITEMS_FETCH_DATA_SUCCESS',
//     items: fakeItem
//   };

//   const fourthExpected = {
//     type: 'ITEMS_HAS_ERRORED',
//     hasErrored: fakeResult
//   };

//   const dispatch = jest
//     .fn()
//     .mockImplementationOnce(action => {
//       expect(action).toEqual(expected);
//     })
//     .mockImplementationOnce(action => {
//       expect(action).toEqual(secondExpected);
//     })
//     .mockImplementationOnce(action => {
//       expect(action).toEqual(thirdExpected);
//     })
//     .mockImplementationOnce(action => {
//       expect(action).toEqual(fourthExpected);
//       scope.done();
//       done();
//     });

//   actions.saveItemAction()(dispatch);
// });

// test('get Item function  will dispatch an action on success', () => {
//   const fakeId = 1;

//   const fakeResult = true;
//   const fakeItems = 'fake';

//   const scope = nock('http://localhost:80')
//     .post('/api/v1/savings')
//     .reply(200);

//   const expected = {
//     type: 'ITEMS_IS_LOADING',
//     isLoading: fakeResult
//   };
//   const secondExpected = {
//     type: 'ITEMS_FETCH_DATA_SUCCESS',
//     items: fakeItems
//   };
//   const thirdExpected = {
//     type: 'ITEMS_HAS_ERRORED',
//     hasErrored: fakeResult
//   };

//   const dispatch = jest
//     .fn()
//     .mockImplementationOnce(action => {
//       expect(action).toEqual(expected);
//     })
//     .mockImplementationOnce(action => {
//       expect(action).toEqual(secondExpected);
//     })
//     .mockImplementationOnce(action => {
//       expect(action).toEqual(thirdExpected);
//       scope.done();
//       done();
//     });

//   actions.getItemAction(fakeId)(dispatch);
// });

test('ITEMS_FETCH_DATA_SUCCESS action creator', () => {
  const fake = 'badItem';
  const expected = {
    type: 'ITEMS_IS_LOADING',
    isLoading: fake
  };

  expect(actions.getitemsIsLoading(fake)).toEqual(expected);
});
