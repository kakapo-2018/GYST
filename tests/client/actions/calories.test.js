import * as actions from '../../../client/actions/calories';
import nock from 'nock';

test('set calories action creator', () => {
  const fakeCalories = 30;

  const expected = {
    type: 'SET_CALORIES',
    isFetching: false,
    totalcalories: fakeCalories
  };

  expect(actions.setCals(fakeCalories)).toEqual(expected);
});

test('get calories action creator', () => {
  const fakeCalories = 30;

  const expected = {
    type: 'GET_CALORIES',
    isFetching: false,
    totalcalories: fakeCalories
  };

  expect(actions.getCals(fakeCalories)).toEqual(expected);
});

test('save total calories will dispatch an action on success', done => {
  const fakeCalories = { calories: 30 };

  const scope = nock('http://localhost:80')
    .post('/api/v1/calories/save')
    .reply(200, fakeCalories);

  const expected = {
    type: 'SET_CALORIES',
    isFetching: false,
    totalcalories: fakeCalories.calories
  };

  const dispatch = jest.fn().mockImplementationOnce(action => {
    expect(action).toEqual(expected);
    scope.done();
    done();
  });

  actions.saveTotalCals(fakeCalories)(dispatch);
});

test('get total calories will dispatch an action on success', done => {
  const fakeCalories = { calories: 30 };

  const scope = nock('http://localhost:80')
    .get('/api/v1/calories/' + fakeCalories.id)
    .reply(200, fakeCalories);

  const expected = {
    type: 'GET_CALORIES',
    isFetching: false,
    totalcalories: fakeCalories.calories
  };

  const dispatch = jest.fn().mockImplementationOnce(action => {
    expect(action).toEqual(expected);
    scope.done();
    done();
  });

  actions.getTotalCals(fakeCalories.id)(dispatch);
});
