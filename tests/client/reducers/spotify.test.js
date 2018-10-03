import spotifyReducer from '../../../client/reducers/spotify';

test('spotify reducer Initial State', () => {
  const expected = [];

  const actual = spotifyReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('getting users spotify playlist', () => {
  const spotify = ['www.spotify.com'];
  const expected = [...spotify];
  const action = {
    type: 'GET_PLAYLIST',
    spotify: spotify
  };

  const actual = spotifyReducer([], action).spotify;

  expect(actual).toEqual(expected);
});

test('cleared playlist state on logout', () => {
  const expected = [];
  const action = {
    type: 'LOGOUT_SUCCESS',
    spotify: []
  };

  const actual = spotifyReducer([], action).spotify;

  expect(actual).toEqual(expected);
});
