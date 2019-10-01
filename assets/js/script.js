var socket = io.connect('http://localhost:8080');

// submit text message without reload/refresh the page
$('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat_message', $('#txt').val());
    $('#txt').val('');
    return false;
});

// append the chat text message
socket.on('chat_message', function(msg){
    $('#messages').append($('<li>').html(msg));
});

// append text if someone is online
socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
});

// ask username
function setName(){
  var username = prompt('Insira seu nome');
  while (username == undefined || username == null || username == "") {
    var username = prompt('Insira seu nome animal');
  }
  socket.emit('username', username);
}

setName();
