var express = require('express');
var router = express.Router();
const ParticipationService = require('../services/participation')
const Services = new ParticipationService()

const { authenticateToken } = require("../jwt-auth/jwt");

/* Create Participation. */

router.post('/create', authenticateToken, async function (req, res, next) {
    if (req.Error === "invalid token" || req.Error === "jwt expired" || req.Error === "to'ken not found") {
        res.send({ error: req.Error })
    } else {
        const event_list = await Services.findUserEvents(req.decode, req.body.event_name)
        if (event_list.length) {
            const usersEmail = event_list.map(e => e.email);
            if (!usersEmail.includes(req.decode.email)) {
                const body = req.body;
                body["team_name"] = event_list[0].team_name
                await Services.createPlayer(body, req.decode).then((data) => {
                    res.send("Participate granted successfully :)")
                }).catch((err) => {
                    res.send(err.message)
                })
            } else {
                res.send("This event already done!")
            }
        } else {
            await Services.createPlayer(req.body, req.decode).then((data) => {
                res.send("Participate granted successfully :)")
            }).catch((err) => {
                res.send(err.message)
            })
        }
    }
});


router.post('/get', authenticateToken, async function (req, res, next) {
    if (req.Error === "invalid token" || req.Error === "jwt expired" || req.Error === "to'ken not found") {
        res.send({ error: req.Error })
    } else {
        const event_data = await Services.findUserEvents(req.decode, req.body.event)
        res.send(event_data)
    }
});

module.exports = router;