var socket = io();

function scrollToButtom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
  // socket.emit('createMessage', {
  //   from:'Jason',
  //   text:'Hello'
  // })
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  scrollToButtom();
  // var li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formatedTime
  });
  $('#messages').append(html);
  scrollToButtom();
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My Current Location</a>')
  // li.text(`${message.from}: ${formatedTime}`);
  // a.attr('href', message.url);
  // li.append(a);
  // $('#messages').append(li);
})

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox =   $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text:   $('[name=message]').val()
  }, function(){
    messageTextbox.val('');
  })
});

var locationButton=$('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation service not supported in your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocation',{
      latitude:position.coords.latitude,
      longitude: position.coords.longitude
    }, function(){});
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  })
})
