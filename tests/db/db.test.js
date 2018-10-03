const testEnv = require('./test-environment');
const db = require('../server/db/userDBFunctions');

let testDb = null;

beforeEach(() => {
  testDb = testEnv.getTestDb();
  return testEnv.initialise(testDb);
});

afterEach(() => testEnv.cleanup(testDb));

test('getUsers gets all users', () => {
  const expected = 3;
  return db
    .getUsers(testDb)
    .then(users => {
      const actual = users.length;
      expect(actual).toBe(expected);
    })
    .catch(err => expect(err).toBeNull());
});

test('getUser user email from getUserByName query', () => {
  const expected = 'a@b.com';
  return db
    .getUserByName('Jake', testDb)
    .then(user => {
      const actual = user.email;
      expect(actual).toBe(expected);
    })
    .catch(err => expect(err).toBeNull());
});

test('Test add user', () => {
  return db
    .createUser(
      { username: 'Luke123', email: '123@456.com', password: '1234' },
      testDb
    )
    .then(result => {
      const actual = result[0];
      expect(actual).toBeGreaterThan(0);
    })
    .catch(err => expect(err).toBeNull());
});
