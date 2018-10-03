import * as actions from '../../../client/actions/register';
import nock from 'nock';

test('REGISTER_REQUEST action creator', () => {
  const fakeCreds = {};
  const expected = {
    type: 'REGISTER_REQUEST',
    isFetching: true,
    isAuthenticated: false,
    creds: fakeCreds
  };

  expect(actions.requestRegister(fakeCreds)).toEqual(expected);
});

test('REGISTER_FAILURE action creator', () => {
  const fakeMessage = '';
  const fakeCreds = {};
  const expected = {
    type: 'REGISTER_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message: fakeMessage
  };

  expect(actions.registerError(fakeMessage)).toEqual(expected);
});

test('register will dispatch an action on success', () => {
  const fakeMessage = '';
  const fakeCreds = {};
  const fakeUser = {
    user_name: 'Test',
    user_password: 'Test'
  };

  const scope = nock('http://localhost:80')
    .post('/api/v1/auth/auth/register')
    .reply(200);

  const expected = {
    type: 'REGISTER_REQUEST',
    isFetching: true,
    isAuthenticated: false,
    creds: fakeCreds
  };
  const secondExpected = {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    user: fakeUser
  };
  const thirdExpected = {
    type: 'REGISTER_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message: fakeMessage
  };

  const dispatch = jest
    .fn()
    .mockImplementationOnce(action => {
      expect(action).toEqual(expected);
    })
    .mockImplementationOnce(action => {
      expect(action).toEqual(secondExpected);
    })
    .mockImplementationOnce(action => {
      expect(action).toEqual(thirdExpected);
      scope.done();
      done();
    });

  actions.registerUser(fakeCreds)(dispatch);
});
