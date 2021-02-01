// server.js
// where your node app starts

require('dotenv').config()

// init project
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//Express routes
const indexRoutes = require('./routes/index');
const letterRoutes = require('./routes/letter');

app.use(express.json());
app.set("view engine", "ejs");
app.set('views', './views')
app.use(morgan('combined'));
app.use(cors());

app.use(express.static(__dirname + '/public'));

//global variable , array to save wishes to send every 15 sec
global.wishes = []

app.use(indexRoutes);
app.use('/letter', letterRoutes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
