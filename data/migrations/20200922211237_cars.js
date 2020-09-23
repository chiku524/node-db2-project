
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id'); //creates primary key, not nullable, and increments on its own. UNIQUE
    tbl.text('make', 128).notNullable();
    tbl.text('model', 128).notNullable();
    tbl.decimal('mileage').notNullable();
    tbl.text('title', 128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};