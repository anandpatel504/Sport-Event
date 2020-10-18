const { Model } = require('objection');
const knex = require('../bin/knex')
Model.knex(knex)
class Sponsor extends Model {
  static get tableName() {
    return 'sponsors';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ["email","sponsoring_amount","event"],
      properties: {
        id: { type: 'integer' },
        sponsor_name: { type: 'string'},
        email: { type: 'string' },
        mobile: { type: 'integer' },
        company_name: { type: 'string' },
        sponsoring_amount: { type: 'string' },
        event: {type: 'string'}
      }
    };
  }
}

module.exports = Sponsor;