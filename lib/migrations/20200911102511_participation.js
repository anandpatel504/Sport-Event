
exports.up = function(knex, Promise) {
    return knex.schema.createTable('participations', table => {
        table.increments('id').primary();
        table.string('event_name').notNullable();
        table.string('participant_name').notNullable();
        table.string('participantion_charge').notNullable();
        table.string('college_name').notNullable();
        table.string('team_name').notNullable();
        table.string('email').notNullable();
    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('participotions')
  };