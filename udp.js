var info = {
  nombre: 'raul',
  edad: 12,
}
exports.udp = function(dgram, srv, io){
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
}
