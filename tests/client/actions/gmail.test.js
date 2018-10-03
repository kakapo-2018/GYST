import * as actions from '../../../client/actions/gmail';
import nock from 'nock';

// test('check unread mail action creator', () => {
//   const fakeCounter = 30;

//   const expected = {
//     type: 'SET_MAIL',
//     counter: fakeCounter
//   };
//   const dispatch = jest.fn().mockImplementationOnce(action => {
//     actions.emailCounter(fakeCounter)(dispatch);
//   });
// });

test('get mail action creator', () => {
  const fakeCounter = 30;

  const expected = {
    type: 'SET_MAIL',
    counter: fakeCounter
  };

  expect(actions.getMail(fakeCounter)).toEqual(expected);
});
