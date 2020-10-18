

exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary();
        table.string('college_name').unique().nullable();
        table.string('event_name').unique().notNullable();
        table.string('description').notNullable();
        table.string('event_creator').nullable();
        table.string('creator_role').nullable();
        table.string('winner_team').nullable();
        table.string('team_captain').nullable();
        table.string('total_scores').nullable();
    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events')
  };