var express = require('express');
var router = express.Router();
const UserService = require('../services/users')
const Services = new UserService()

const { generateAccessToken, authenticateToken } = require("../jwt-auth/jwt");

/* POST users listing. */

router.post('/login', async function (req, res, next) {
  const UserInfo = await Services.emailChecking(req.body.email);
  if (UserInfo) {
    const passCheck = await Services.PassChecking(UserInfo, req.body.password)
    if (passCheck) {
      const Token = generateAccessToken(UserInfo)
      // res.cookie(process.env.ACCESS_KEY,Token)
      res.send(process.env.ACCESS_KEY + Token)
    } else {
      res.send("password is worng! 🤔")
    }
  } else {
    res.send("This @Email does not exist! 😅")

  }
});

/* Create New Users. */

router.post('/sing_up', async function (req, res, next) {
  await Services.create(req.body).then((data) => {
    data['password'] = null
    res.send("successful")
  }).catch((err) => {
    res.send(err.message)
  })
});

/* Make Admin for Users. */

router.post('/user_role', authenticateToken, async function (req, res, next) {
  if (req.Error === "invalid token" || req.Error === "jwt expired" || req.Error === "to'ken not found") {
    res.send({ error: req.Error })
  } else {
    if (req.decode.user_role == "HOD") {
      Services.MakeAdmin(req.body).then((data) => {
        if (!data) res.send("this email is not available! 😒")
        else {
          res.send("User Role Update :)")
        }
      }).catch((err) => {
        res.send(err.message)
      })
    } else {
      res.send("You don't have access! 😮")
    }
  }

});

/* Get Details of particular college . */

router.post('/college', async function (req, res, next) {
  const details = await Services.CollegeInfo(req.body);
  res.send(details)
});

router.get('/colleges/list', async function (req, res, next) {
  const details = await Services.FindColleges();
  res.send(details)
});
/* check jwt token is valid or not */
router.post('/token/validation', authenticateToken, async (req, res, next) => {
  if (req.Error === "invalid token" || req.Error === "jwt expired" || req.Error === "to'ken not found") {
    res.send({ error: req.Error })
  } else {
    res.send(req.decode)
  }
})

module.exports = router;