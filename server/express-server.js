var express = require('express');
var bodyparser = require('body-parser');

var app = express();
var linksys = express.Router();

var messages = [];
var counter = 0;

// Middlewarez
app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.set({"Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Max-Age": 10 // Seconds.
  });
  next();
});

app.use(linksys);

// Static Routes

linksys.use('/', express.static(__dirname + '/../client'));

// Routes

linksys.post('*', function(req, res, next){
  req.body.createdAt = new Date(Date.now()).toISOString();
  req.body.objectId = counter++;
  next();
});

linksys.route('/classes/messages')
  .options(function(req, res) {
    res.send();
  })
  .get(function(req, res) {
    res.json({
      results: messages
      });
  })
  .post(function(req, res) {
    messages.push(req.body);
    res.status(201).send();
  });

linksys.route('/classes/:room')
  .options(function(req, res) {
    res.send();
  })
  .get(function(req, res) {
    res.json({
      results: messages.filter(function(msg) {
        return msg.roomname === req.params.room;
      })
    })
  })
  .post(function(req, res) {
    var msg = req.body;
    msg.roomname = req.params.room;
    messages.push(msg);

    res.status(201).send();
  })

var server = app.listen(3000, function() {
  var host = server.address().address || '127.0.0.1';
  var port = server.address().port;

  console.log('Chatterbox-server listening at http://%s:%s', host, port);
});
