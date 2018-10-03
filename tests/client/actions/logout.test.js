import * as actions from '../../../client/actions/logout';
import nock from 'nock';

test('LOGOUT_REQUEST action creator', () => {
  const expected = {
    type: 'LOGOUT_REQUEST',
    isFetching: true,
    isAuthenticated: true
  };

  expect(actions.requestLogout()).toEqual(expected);
});

test('LOGOUT_SUCCESS action creator', () => {
  const expected = {
    type: 'LOGOUT_SUCCESS',
    isFetching: false,
    isAuthenticated: false
  };

  expect(actions.receiveLogout()).toEqual(expected);
});
