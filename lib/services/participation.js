const Participation = require('../models/participation');

module.exports = class ParticipationService {

    async createPlayer(details,decode) {
        details['participant_name'] =decode.username;
        details['college_name'] = decode.college_name;
        details['email']= decode.email;
        delete details['token']
        return await Participation.query().insertGraph(details);
    }

    async findUserEvents(decode,event) {
        return await Participation.query().select("*")
        .where({"college_name":decode.college_name,"event_name":event})
    }
};