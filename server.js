var http = require('http');
var server = http.createServer(handler);
var fs = require('fs');
var io = require("socket.io").listen(server);

var port = 3000;

server.listen(port);
console.log("listening on port " + port);

function handler(req, res) {

  fs.readFile('./index.html', function(error, html) {
    if (error) {
      throw error;
    }

    res.writeHead(200 , { "Content-Type": "text/html"});
   	res.write(html);
    res.end();
  });
};


// number init
var number = 0;

// when a client connects
io.sockets.on("connection", function(socket) {

  // send current number value to that client
  socket.emit("server up number", number);

  // when a client asks for up number
  socket.on("client up number", function (data) {
    // up number value
    number += 1;
    // send new number to all clients
    io.emit("server up number", number);
  });

});
