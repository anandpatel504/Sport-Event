var express = require('express');
var router = express.Router();
const { authenticateToken } = require("../jwt-auth/jwt");
const EventsService = require('../services/events')
const Services = new EventsService()


/* GET all Users Events. */
router.get('/all', async function (req, res, next) {
  const EventInfo = await Services.findAll();
  res.send(EventInfo)
});

/* Get All categories list . */

router.get('/categories', async function (req, res, next) {
  const EventInfo = await Services.findAllEvents();
  const totalInfo = await Services.findAllSponsores(EventInfo)
  res.send(totalInfo)
});

// Get winner list 
router.get('/winners', async function (req, res, next) {
  const winnersInfo = await Services.findAllWinners();
  res.send(winnersInfo)
});

/* POST Add event like categorie only for admin/HOD. */

router.post('/add', authenticateToken, async function (req, res, next) {
  if (req.Error === "invalid token" || req.Error === "jwt expired" || req.Error === "to'ken not found") {
    res.send({ error: req.Error })
  } else {
    const Role = await Services.verifyRole(req.decode)
    if (Role) {
      await Services.AddEvent(req.body).then((EventInfo) => {
        res.send("Event create successful :)")
      }).catch((err) => {
        console.log(err.name);
        if (err.name === "DataError") {
          res.send({ error: "This description is soo big!" })
        } else {
          res.send({ error: "This event already exist" })
        }
      })
    } else {
      res.send({ error: "You don't have access! 😮" })
    }
  }
});

/* POST update user event only for admin/HOD . */

router.post('/update', authenticateToken, async function (req, res, next) {
  if (req.Error === "invalid token" || req.Error === "jwt expired" || req.Error === "to'ken not found") {
    res.send({ error: req.Error })
  } else {
    const Role = await Services.verifyRole(req.decode)
    if (Role) {
      Services.UpdateEventInfo(req.body, req.decode).then((data) => {
        if (!data) res.send({ error: "this event is not available! 😒" })
        else {
          res.send("event updated :)")
        }
      }).catch((err) => {
        res.send({ error: err.message })
      })
    } else {
      res.send({ error: "You don't have access! 😮" })
    }
  }

});

/* POST delete user event only access for admin/HOD . */

router.post('/delete', authenticateToken, async function (req, res, next) {
  if (req.Error === "invalid token" || req.Error === "jwt expired" || req.Error === "to'ken not found") {
    res.send({ error: req.Error })
  } else {
    const Role = await Services.verifyRole(req.decode)
    if (Role) {
      Services.RemoveEvent(req.body).then((data) => {
        if (!data) res.send({ error: "this event is not available! 😒" })
        else {
          res.send("event Deleted :)")
        }
      }).catch((err) => {
        res.send(err.message)
      })
    } else {
      res.send({ error: "You don't have access! 😮" })
    }
  }

});


module.exports = router;
