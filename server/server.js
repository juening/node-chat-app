const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
console.log(__dirname + '/../public');
console.log(publicPath);

const port = process.env.PORT || 3000;

const app = express();
const server= http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');



  socket.on('createMessage', function(message) {
    console.log('Message is ', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })；
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text:message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});



server.listen(port, ()=> {
  console.log('Listening to port ', port);
});
