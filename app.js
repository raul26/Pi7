var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var info = {
  nombre: 'raul',
  edad: 12,
}
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('home');
});


io.on('connection', function  (socket) {
  console.log('jala')
})
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
