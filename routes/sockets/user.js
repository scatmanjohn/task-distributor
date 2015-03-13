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
    $self.sendResult = function(socket, action, success, user, message){
        socket.emit('send:user:' + action, {
            success:success,
            user:user,
            message:message
        });
        
        // Send broadcast in order to warn other users if success = true
        if(success)
            socket.broadcast.emit("send:something-changed-user", { action:action });
    };
    
    
    /**
      * Send all users
      */
    $self.sendUsersList = function(socket){
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
        $self.sendUsersList(socket);
    });
  
  
    /**
      *  Ask for adding new user
      */
    socket.on('get:user:new', function(data){
        // User instance
        var u = new models.User(data.user);
        // Save
        u.save(function (err, u) {
            if (err)
                $self.sendResult(socket, "created", false, u, err);
            else  
               $self.sendResult(socket, "created", true, u, "User saved");
        });
    });

    /**
      *  Ask for remove an user
      */
    socket.on('get:user:remove', function(data){
        if(!data || !data.id) return false;
        var users = models.User.findOne(data.id);
        users.exec(function (err, user) {
            if (err) $self.sendResult(socket, "removed", false, user, "An error occured");  //return handleError(err);
            else if(user) {
                user.remove();  // Remove user
                $self.sendResult(socket, "removed", true, user, "User has been removed");
            }
        });
    });
    
    /**
      *  Ask for user field saving
      */
    socket.on('get:user:fieldsave', function(data){
       models.User.findById(data.id, function(err, u){
           if(err)
               $self.sendResult(socket, "fieldsaved", false, u, err);
           else if(!u)
               $self.sendResult(socket, "fieldsaved", false, u, "User not found");
           else // UPDATE field
           {
               u[data.field] = data.data;
               u.save(function(err){
                   if(err)
                       $self.sendResult(socket, "fieldsaved", false, u, err);
                   else $self.sendResult(socket, "fieldsaved", true, u, err);
               });
                
           }
       });
    });
  
  
};
