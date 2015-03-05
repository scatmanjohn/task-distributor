/*
 * User data
 */

module.exports = function (socket) {
  socket.emit('send:user', {
	user:{
		login: 'a.lebrun',
		level: 'admin'
	}
  });
};
