
var ws = new WebSocket('ws://localhost:5555');
 //event emmited when connected
 ws.onopen = function(){
  console.log('websocket is connected ...');
  console.log("Inserting new player")

  let newPlayer = {
    "type":"new_player"
  }

  let movement = {
    "type": "movement",
    "x": 300,
    "y": 300
  }

  ws.send(JSON.stringify(newPlayer))
  // sending a send event to websocket server
  console.log('player sent');
}

//event emmited when receiving message
ws.onmessage = function (ev) {
  console.log(ev);
}
