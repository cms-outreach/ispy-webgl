/*
 This comes from
 http://www.tysoncadenhead.com/blog/exporting-canvas-animation-to-mov
*/

var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs');

server.listen(3000);

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
  socket.on('render-frame', function(data) {
    data.file = data.file.split(',')[1];
    var buffer = new Buffer(data.file, 'base64');
    fs.writeFile(__dirname + '/tmp/frame-' + data.frame + '.png', buffer.toString('binary'), 'binary');
  });
});
