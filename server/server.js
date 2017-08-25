const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocation } = require('./utils/message.js');
const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, "../public");
console.log(__dirname + '/../public');
console.log(publicPath);

const port = process.env.PORT || 3000;

const app = express();
const server= http.createServer(app);
const io = socketIO(server);
const users = new Users;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);//remove user from possible previous chat room
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    // callback();
  });

  socket.on('createLocation', ({latitude, longitude}, callback) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage',generateLocation(user.name, latitude, longitude));      
    }
    // callback();
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});



server.listen(port, ()=> {
  console.log('Listening to port ', port);
});
