const fs = require('fs');

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var router = express.Router();

router.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {
  res.send('home');
});

// router.get('/expenses', function(req, res) {

// });

// router.get('/api/players/:name', function(req, res) {
//     var toSend = search(req.params.name);
//     res.send(toSend);
// });

app.listen(port);
app.use('/', router);
