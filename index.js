var express = require('express');

var WebSocket = require('ws');
wss = new WebSocket.Server({port:5555});

//app setup
var app = express();


//Serve a static file to our frontend
app.use(express.static('public'));



// Socket Setup
app.get('/', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});

app.listen(5554,function(){
    console.log('Example app listening on port 5554!');
});


var players = {};
wss.on('connection', function(socket) {
   socket.on('message', function(event){
    let result = JSON.parse(event)
    console.log(socket.id)

    if(result.type == "new_player"){
      console.log("Received a new player!")
    }

  }); 
  console.log("Connection established on port: 5555")
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
});

wss.broadcast = function broadcast(data){
  wss.clients.forEach(function each(client){
    if (client.readyState === WebSocket.OPEN){
      cleint.send(data)
    }
  })
}

