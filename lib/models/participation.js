const { Model } = require('objection');
const knex = require('../bin/knex')
Model.knex(knex)
class Participation extends Model {
  static get tableName() {
    return 'participations';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['team_name','event_name','participant_name','participantion_charge','college_name'],
      properties: {
        id: { type: 'integer' },
        event_name: { type: 'string'},
        participant_name: { type: 'string' },
        participantion_charge : { type: 'string' },
        college_name: { type: 'string' },
        team_name: { type: 'string' },
        email: { type: 'string' }
      }
    };
  }
}

module.exports = Participation;