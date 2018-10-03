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
  const actual = authReducer(initialState, {
    type: 'LOGIN_REQUEST'
  });
  expect(actual).toEqual({
    ...initialState,
    isFetching: true,
    isAuthenticated: false,
    errorMessage: ''
  });
});
