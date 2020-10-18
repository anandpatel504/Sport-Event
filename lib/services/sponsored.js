const Sponsor = require('../models/sponsored');
module.exports = class SponsorService {
    async findAll(txn) {
        const sponsore_details = await Sponsor.query(txn);
        return sponsore_details;
    }
    async findSponsoreInfo(details) {
        return await Sponsor.query().select("*")
        .where({"event":details.event,"email":details.email})
    }

    async create(details) {
        return await Sponsor.query().insertGraph(details);
    }
};