const Events = require('../models/events');
const Sponsore = require('../models/sponsored');

module.exports = class EventsService {
    async verifyRole(Info) {
        if (Info.user_role == "Admin" || Info.user_role == "HOD") {
            return true
        } else {
            return false
        }
    }
    async findAll(txn) {
        const event_details = await Events.query(txn);
        return event_details;
    }
    async findAllEvents(txn) {      
        return await Events.query(txn).select("event_name","description");
    }

    async findAllWinners(txn){
        return await Events.query(txn).whereNotNull("total_scores");
    }

    async findAllSponsores(EventsInfo) {
        const promises = EventsInfo.map(async (eventDict) => {
            const Cname = await Sponsore.query().select("company_name").where({'event':eventDict.event_name})
            eventDict['sponsors']= Cname.map(el =>el.company_name).toString()
            return eventDict
        });
        return Promise.all(promises);
    }
    async AddEvent(details) {
        delete details["token"]
        return await Events.query().insertGraph(details);
    }
    async UpdateEventInfo(details, UserInfo) {
        const event_name = details.event_name
        details['event_creator'] = UserInfo.username
        details['creator_role'] = UserInfo.user_role
        delete details["token"]
        return await Events.query()
            .update(details)
            .where({ event_name });
    }

    async RemoveEvent(EventInfo) {
        const event_name = EventInfo.event_name
        return await Events.query()
            .del()
            .where({event_name})
    }
};