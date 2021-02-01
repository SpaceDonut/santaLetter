const axios = require('axios');

const checkUser = async (req, res, next) => {
  try { 
    const users = await axios.get(process.env.USERS_URL);
    const user = users.data.filter(user => user.username === req.body.userId)[0];

    if(!user) return res.send({statusMsg: "Failed"});
    next();
  } catch(e) {
    console.error(e);
    req.redirect('/');
  }
}

module.exports = checkUser;