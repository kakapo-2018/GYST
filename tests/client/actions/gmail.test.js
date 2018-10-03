import * as actions from '../../../client/actions/gmail';

test('get mail action creator', () => {
  const fakeCounter = 30;

  const expected = {
    type: 'SET_MAIL',
    counter: fakeCounter
  };

  expect(actions.getMail(fakeCounter)).toEqual(expected);
});
