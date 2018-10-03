import * as actions from '../../../client/actions/insta';
import nock from 'nock';

test('get Instagram will dispatch an action on success', done => {
  const fakeInstagram = {};

  const scope = nock('http://localhost:80')
    .get('/api/v1/insta')
    .reply(200, fakeInstagram);

  const expected = {
    type: 'GET_INSTA',
    isFetching: false,
    insta: fakeInstagram
  };
  const dispatch = jest.fn().mockImplementationOnce(action => {
    expect(action).toEqual(expected);
    scope.done();
    done();
  });
  actions.getInsta(fakeInstagram)(dispatch);
});

test('receive Instagram action creator', () => {
  const fakeInstagram = {};

  const expected = {
    type: 'GET_INSTA',
    isFetching: false,
    insta: fakeInstagram
  };

  expect(actions.recieveInsta(fakeInstagram)).toEqual(expected);
});

test('add Instagram will dispatch an action on success', done => {
  const fakeInstagram = {};

  const scope = nock('http://localhost:80')
    .post('/api/v1/insta/save')
    .reply(200, fakeInstagram);

  const expected = {
    type: 'GET_INSTA',
    isFetching: false,
    insta: fakeInstagram
  };
  const dispatch = jest.fn().mockImplementationOnce(action => {
    expect(action).toEqual(expected);
    scope.done();
    done();
  });
  actions.addInsta(fakeInstagram)(dispatch);
});
