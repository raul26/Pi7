var express = require('express');
var app = express();
var dgram = require('dgram');
var srv = dgram.createSocket("udp4");
var udp = require('./udp');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
//io.set('log level', 0);
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

udp.udp(dgram, srv, io);

io.on('connection', function  (socket) {
  console.log(' conected');
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/api', function  (req, res) {
  res.type('text/plain');
  res.send(info)
})
// custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render('404')
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500')
});
server.listen(3000, function () {
  console.log('listenning on port 3000');
});
