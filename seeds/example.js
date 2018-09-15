exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('example')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('example').insert([
        { id: 1, name: 'Jake', address: 'Wanganui' },
        { id: 2, name: 'Bruce', address: 'EDA' },
        { id: 3, name: 'Suzuki', address: 'Japan' }
      ]);
    });
};
