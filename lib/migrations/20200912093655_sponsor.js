
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sponsors', table => {
        table.increments('id').primary();
        table.string('sponsor_name').notNullable();
        table.string('email').notNullable();
        table.bigInteger('mobile').notNullable();
        table.string('company_name').notNullable();
        table.string('sponsoring_amount').notNullable();
        table.string('event').notNullable();
    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sponsors')
  };
