const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { knex } = require("../models/users");
const Key = process.env.ACCESS_KEY


// UserInfo is in the form { email: "my cool @email" }
// ^^the above object structure is completely arbitrary
function generateAccessToken(UserInfo) {
    const {id, email, college_name, user_role, username} = UserInfo;
    // expires after 10 hour
    return jwt.sign({ id, email, college_name, user_role, username}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}


function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    var authHeader = req.query.token || req.body.token || req.headers.cookie;
    var token = authHeader && authHeader.split(' ')[0]
    if (!token) {
        req.Error ='to\'ken not found'
        next()
    }
    try {
        if (token.startsWith(Key)) {
            token = token.slice(Key.length, token.length)
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
            req.decode = decoded;
            next(); // pass the execution off to whatever request the client intended
        }

    } catch (error) {
        console.log(error,"This is token error please check'it");
        req.Error =error.message
        next()        
    }
}

module.exports = { generateAccessToken, authenticateToken }