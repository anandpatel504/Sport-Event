
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email').unique().notNullable();
        table.bigInteger('mobile').notNullable();
        table.string('college_name').notNullable();
        table.string('DOB').notNullable();
        table.string('password').notNullable();
        table.string('user_role').notNullable();
    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
  };