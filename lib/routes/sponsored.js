var express = require('express');
var router = express.Router();
const SponsorService = require('../services/sponsored')
const Services = new SponsorService()

router.get('/all_info', async function (req, res, next) {
    const sponsores_data = await Services.findAll();
    res.send(sponsores_data)
});

router.post('/create', async (req, res, next) => {
    const info = await Services.findSponsoreInfo(req.body);
    if (info.length) {
        const sponsorEvent = info.map(e => e.event);
        if (!sponsorEvent.includes(req.body.event)) {
            await Services.create(req.body).then((data) => {
                res.send("participate granted successfully :)")
            }).catch((err) => {
                res.send(err.message)
            })
        }else {
            res.send("You already sponsored!")
        }
    } else {
        await Services.create(req.body).then((data)=>{
            res.send("sponsored successful thank you :)")
        }).catch(err => res.send(err.message))
    }
})

module.exports = router;