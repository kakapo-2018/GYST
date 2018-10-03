import authReducer from '../../../client/reducers/auth';
import { isAuthenticated, getUserTokenInfo } from '../../../client/utils/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(),
  user: getUserTokenInfo(),
  errorMessage: ''
};

test('auth reducer Initial State', () => {
  const actual = authReducer(undefined, {});

  expect(actual).toEqual(initialState);
});

test('LOGIN_REQUEST', () => {
  const action = {
    type: 'LOGIN_REQUEST'
  };

  const actual = authReducer(initialState, action);
  expect(actual).toEqual({
    ...initialState,
    isFetching: true,
    isAuthenticated: false,
    errorMessage: ''
  });
});

test('LOGIN_SUCCESS', () => {
  const action = {
    type: 'LOGIN_SUCCESS',
    user: {
      user_name: 'Test',
      user_password: 'Test'
    }
  };
  const actual = authReducer(initialState, action);
  expect(actual).toEqual({
    ...initialState,
    isFetching: false,
    isAuthenticated: true,
    user: {
      user_name: 'Test',
      user_password: 'Test'
    }
  });
});
