import * as actions from '../../../client/actions/weight';
import nock from 'nock';

const fakeid = {
  id: 1
};

test('get weight will dispatch an action on success', done => {
  const fakeWeight = [{ date: '20', kg: '30' }];

  const scope = nock('http://localhost:80')
    .get('/api/v1/weight')
    .reply(200, fakeWeight);

  const expected = {
    type: 'LOADING_WEIGHT',
    isFetching: true
  };
  const secondExpected = {
    type: 'GET_WEIGHT',
    isFetching: false,
    weight: [['Date', 'Weight'], ['20', '30']]
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

  actions.getWeightAction()(dispatch);
});

test('receive weight action creator', () => {
  const fakeWeight = [20, 30];

  const expected = {
    type: 'GET_WEIGHT',
    isFetching: false,
    weight: fakeWeight
  };

  expect(actions.recieveWeight(fakeWeight)).toEqual(expected);
});

test('set weight action creator', () => {
  const fakeWeight = [20, 30];

  const expected = {
    type: 'SET_WEIGHT',
    isFetching: false,
    weight: fakeWeight
  };

  expect(actions.setWeight(fakeWeight)).toEqual(expected);
});

test('loading weight action creator', () => {
  const expected = {
    type: 'LOADING_WEIGHT',
    isFetching: true
  };

  expect(actions.gettingWeights()).toEqual(expected);
});

test('save weight will dispatch an action on success', () => {
  const fakeWeight = [{ date: '20', kg: '30' }];

  const scope = nock('http://localhost:80')
    .get('/api/v1/weight/save')
    .reply(200, fakeWeight);

  const expected = {
    type: 'LOADING_WEIGHT',
    isFetching: true
  };
  const secondExpected = {
    type: 'SET_WEIGHT',
    isFetching: false,
    weight: [['Date', 'Weight'], ['20', '30']]
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

  actions.saveWeightAction(dispatch);
});
