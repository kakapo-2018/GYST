const request = require('supertest');

jest.mock('../../server/db/userDBfunctions', () => ({
  getUser: id =>
    Promise.resolve({ id: id, name: 'test user', email: 'test@user.nz' }),
  getUsers: () =>
    Promise.resolve([
      { id: 2, name: 'test user 2', email: 'test2@user.nz' },
      { id: 4, name: 'test user 4', email: 'test4@user.nz' }
    ])
}));

const server = require('../../server/server');

test('GET /', () => {
  return request(server)
    .get('/api/v1/')
    .expect(200)
    .then(res => {
      // console.log('response', res.text);

      expect(res.text).toContain('@user.nz');
    })
    .catch(err => expect(err).toBeNull());
});
