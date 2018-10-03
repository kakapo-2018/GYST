import * as actions from '../../../client/actions/login';
import nock from 'nock';

test('LOGIN_REQUEST action creator', () => {
  const expected = {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false
  };

  expect(actions.requestLogin()).toEqual(expected);
});

test('LOGIN_SUCCESS action creator', () => {
  const fakeUser = {
    user_name: 'Test',
    user_password: 'Test'
  };

  const expected = {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    user: fakeUser
  };

  expect(actions.receiveLogin(fakeUser)).toEqual(expected);
});

test('LOGIN_FAILURE action creator', () => {
  const expected = {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message: 'Login failed'
  };

  expect(actions.loginError()).toEqual(expected);
});

test('login will dispatch an action on success', () => {
  const fakeUser = {
    user_name: 'Test',
    user_password: 'Test'
  };

  const scope = nock('http://localhost:80')
    .post('/api/v1/auth/login')
    .reply(200);

  const expected = {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false
  };
  const secondExpected = {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message: 'Login failed'
  };
  const thirdExpected = {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    user: fakeUser
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

  actions.loginUser()(dispatch);
});

test('IMAGE_RECEIVED action creator', () => {
  const fakeImage = 'image';

  const expected = {
    type: 'IMAGE_RECEIVED',
    isFetching: false,
    isAuthenticated: true,
    image: fakeImage
  };

  expect(actions.receiveImage(fakeImage)).toEqual(expected);
});

test('get profile image will dispatch an action on success', () => {
  const fakeImage = 'image';

  const scope = nock('http://localhost:80')
    .get('/api/v1/image')
    .reply(200, fakeImage);

  const expected = {
    type: 'IMAGE_RECEIVED',
    isFetching: false,
    isAuthenticated: true,
    image: fakeImage
  };
  const secondExpected = {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message: 'Login failed'
  };
  const dispatch = jest
    .fn()
    .mockImplementationOnce(action => {
      expect(action).toEqual(expected);
    })
    .mockImplementationOnce(action => {
      expect(action).toEqual(secondExpected);
      scope.done();
      done();
    });

  actions.getProfileImage(dispatch);
});
