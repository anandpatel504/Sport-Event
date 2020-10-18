const { Model } = require('objection');
const knex = require('../bin/knex')
Model.knex(knex)
class Events extends Model {
    static get tableName() {
        return 'events';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['event_name'],
            properties: {
                id: { type: 'integer' },
                college_name: { type: 'string', minLength: 1, maxLength: 255 },
                event_name: { type: 'string' },
                description: { type: 'string' },
                event_creator: { type: 'string' },
                creator_role: { type: 'string' },
                winner_team: { type: 'string' },
                team_captain: { type: 'string' },
                total_scores: { type: 'string' }
            }
        };
    }
}

module.exports = Events;