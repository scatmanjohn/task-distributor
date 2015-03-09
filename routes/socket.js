/*
 * Serve content over a socket
 */
 
 

var User = require('./sockets/user');

var Global = function (socket) {
		  socket.emit('send:appName', {
			appName: 'Task-distributor'
		  });

		  //setInterval(function () {
			socket.emit('send:time', {
			  time: (new Date()).toString()
			});
		//	}, 1000);  
		};

 
module.exports = function(socket){
	User(socket);
	Global(socket);
}


