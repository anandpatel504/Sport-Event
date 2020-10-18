const Users = require('../models/users');
const bcrypt = require("bcryptjs");
var HOD_roles = require('../../Config/constant').split(',')
module.exports = class UserService {
    async MakeAdmin(details){
        const email = details.email;
        delete details["token"]
        return await Users.query()
        .update(details)
        .where({ email });
    }

    async PassChecking(userInfo, Pass) {
        return await bcrypt.compare(Pass, userInfo.password)
    }

    async findAll(txn) {
        const user_details = await Users.query(txn);
        return user_details;
    }
    async FindColleges(txn){
        const collegeList = await Users.query(txn).distinct('college_name');
        return collegeList;
    }

    async emailChecking(EmailId) {
        const user_details = await Users.query().findOne({
            email: EmailId
        });
        return user_details;
    }

    async create(details) {
        if (HOD_roles.includes(details.email)) {
            details['user_role'] = 'HOD'
        }
        const pass = await bcrypt.hash(details.password, 8)
        details['password'] = pass
        return await Users.query().insertGraph(details);
    }

    async CollegeInfo(Info){
        return await Users.query().select("username","email","college_name","user_role")
        .where(Info);
    }
};