var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());


var messages = [];

var linksys = express.Router();

app.use(function(req, res, next) {
  res.set({"Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Max-Age": 10 // Seconds.
  });
  next();
});

app.use(linksys);

linksys.route('/classes/messages').options(function(req, res) {
  res.send();
})
.get(function(req, res) {
  res.json(messages);
})
.post(function(req, res) {
  messages.push(req.body);
  res.status(201).send();
});

// app.get('/classes/messages', function(req, res) {
//   res.json(messages);
// });

// app.post('/classes/:room', function(req, res) {

// })

// app.post('/classes/messages', function(req, res) {
//   messages.push(req.body);
//   res.status(201).send();
// });

// app.get('/classes/:room', function(req, res) {
//   res.json(messages.filter(function(msg) {
//     return msg === req.params.room;
//   }))
// })

// app.get('/', function(req, res){
//   res.send('blech');
// });

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Chatterbox-server listening at http://%s:%s', host, port);
});

cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Max-Age": 10 // Seconds.
  };
