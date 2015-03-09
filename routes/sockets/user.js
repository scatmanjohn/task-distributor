/*
 * User data
 */
 
var mongoose = require('mongoose');
var models 	 = require('../../models'); 

module.exports = function (socket) {
    var $self = this;
    socket.emit('send:user', {
        user:{
            username: 'a.lebrun',
            level: 'admin'
        }
    });
    
////// SEND ////////////////
    
    /**
     *  Send a message with success status of the add user request
     */
    $self.sendAddedUserMessage = function(success, user, message){
        socket.emit('send:user:added', {
            success:success,
            user:user,
            message:message
        });
    };
    
    /**
     *  Send a message with success status of the remove user request
     */
    $self.sendRemovedUserMessage = function(success, user, message){
        socket.emit('send:user:removed', {
            success:success,
            user:user,
            message:message
        });
    };
    
    /**
      * Send all users
      */
    $self.sendUsersList = function(){
        var users = models.User.find();
        users.exec(function (err, users) {
            if (err) return handleError(err);
            else {
                socket.emit('send:user:list', {
                    users: users
                }); 
            }
        });
    };
    
    ////// RECEPTION ///////////
    /**
      *  Ask for user list
      */
    socket.on('get:user:list', function(){
        $self.sendUsersList();
    });
  
  
    /**
      *  Ask for adding new user
      */
    socket.on('get:user:add', function(){
        console.log("?");
        // User instance
        var u = new models.User({
                name: {
                    first: "Jean",
                    last: "Scatman "
                },
                username: "john.scatman",
                password: "pass"
        });

        // Save
        u.save(function (err, u) {
            if (err)
                $self.sendAddedUserMessage(false, u, err);
            else  
               $self.sendAddedUserMessage(true, u, "User saved");
        });
    });

    /**
      *  Ask for remove a new user
      */
    socket.on('get:user:remove', function(data){
        if(!data || !data.id) return false;
        var users = models.User.findOne(data.id);
        users.exec(function (err, user) {
            if (err) $self.sendRemovedUserMessage(false, user, "An error occured");  //return handleError(err);
            else if(user) {
                user.remove();  // Remove user
                $self.sendRemovedUserMessage (true, user, "User has been removed");
            }
        });
    });
  
};
