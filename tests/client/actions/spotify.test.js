import * as actions from '../../../client/actions/spotify';
import nock from 'nock';

test('IMAGE_RECEIVED action creator', () => {
  const fakeSpotify = { name: 'Beyonce' };

  const expected = {
    type: 'GET_PLAYLIST',
    isFetching: false,
    spotify: fakeSpotify
  };

  expect(actions.recievePlaylist(fakeSpotify)).toEqual(expected);
});
