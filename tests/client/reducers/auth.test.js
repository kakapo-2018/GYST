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
