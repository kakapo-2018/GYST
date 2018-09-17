exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'Jake', address: 'Wanganui' },
        { id: 2, username: 'Bruce', address: 'EDA' },
        { id: 3, username: 'Suzuki', address: 'Japan' }
      ]);
    });
};
