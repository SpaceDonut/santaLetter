const express = require("express");
const router = express.Router();

const axios = require('axios');

const middleware = require('../middleware/user')

const { convertToDate, calculateAge } = require('../utils/date_helpers/date')

router.post('/new', middleware, async (req, res) => {

  console.log('~~~~~~~~~~~ BACKEND: /letter ' + JSON.stringify(req.body));
  try{
    const users = await axios.get(process.env.USERS_URL);
    const userProfiles = await axios.get(process.env.USER_PROFILES_URL);

    const user = users.data.filter(user => user.username === req.body.userId)[0];
    const userProfile = userProfiles.data.filter(userProfile => userProfile.userUid === user.uid)[0];
    const age = calculateAge(convertToDate(userProfile && userProfile.birthdate));
  
    if(age > 10 ) return res.send({statusMsg: "Failed"});

    const wish = {
      username: req.body.userId,
      address: userProfile.address,
      wish: req.body.wish
    }
    
    //save into global in order to send mails every 15 seconds
    //TODO send emails with data inside wishes
    global.wishes.push(wish);

    return res.send({statusMsg: "Success"})
    
  } catch(e) {
    res.render('failure')
    console.error(e);
  }
  
});

router.get('/success', (req, res) => {
  res.render('success');
});

router.get('/failure', (req, res) => {
  res.render('failure');
});

module.exports = router;