var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var info = {
  nombre: 'raul',
  edad: 12,
}
//io.set('log level', 0);
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

io.on('connection', function  (socket) {

  var dgram = require('dgram');
  var srv = dgram.createSocket("udp4");

  srv.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    io.sockets.emit('message', msg);
  });

  srv.on("listening", function () {
    var address = srv.address();
    io.sockets.emit('message', info);
    console.log("server listening " + address.address + ":" + address.port);
  });

  srv.on('error', function (err) {
    console.error(err);
    process.exit(0);
  });

  srv.bind('9998');
})


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
