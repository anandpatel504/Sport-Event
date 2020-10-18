const { Model } = require('objection');
const knex = require('../bin/knex')
Model.knex(knex)
class Users extends Model {
  static get tableName() {
    return 'users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string' },
        password: { type: 'string' },
        mobile: { type: 'integer' },
        college_name: { type: 'string' },
        DOB: { type: 'string' },
        user_role: {type: 'string', default:"student"},
      }
    };
  }
}

module.exports = Users;