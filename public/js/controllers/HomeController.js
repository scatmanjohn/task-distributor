'use strict';

/* Controllers */

angular.module('TaskDistributorApp.HomeControllers', []).
  controller('HomeController', function ($scope, socket) {
  	$scope.users = [];
	
	////////////////////// EVENTS /////////////////////
	
	/**
	 *		Reveive current user data
	 */
	socket.on('send:user', function (data) {
      $scope.user 	= data.user;
    });

	/**
	 *		Receive users list
	 */
	socket.on('send:user:list', function (data) {
          $scope.users 	= data.users;
    });	
    
    /**
	 *		Receive removed user response
	 */
    socket.on('send:user:removed', function (data) {
        if(data && data.success)
        {
            $scope.openAnnounce("User {0} has been removed".format(data.user.username), "success");
            $scope.refreshUserList();
        } else $scope.openAnnounce(data.message, "danger");
    });    
    
    
    /**
	 *		Receive added user response
	 */
    socket.on('send:user:created', function (data) {
        if(data && data.success)
        {
            $scope.openAnnounce(data.message, "success");
            $scope.refreshUserList();
        } else $scope.openAnnounce(data.message, "danger");
    });
	

	/////////////////// ACTIONS ////////////////////////
    
	/** 	
      * Refresh user list 
      **/
	$scope.refreshUserList = function(){
		socket.emit('get:user:list');
	};
    
    /** 	
      * Remove user by id 
      **/
	$scope.removeUser = function(id){
		socket.emit('get:user:remove', { id:id });
	};

    /**
      * New user
      */
    $scope.createUserAction = function(){
        if($scope.forms.new_user && $scope.forms.new_user.$valid)
        {
            var user =  {
                name:{
                    last: new_user.lastname,
                    first: new_user.firstname
                },
                username: new_user.username,
                password: "password"
            };
            
            socket.emit("get:user:new", { user:user } );
            
            $("#new_user").modal('hide');    
        } else { 
            $("#new_user").modal('hide');
            $scope.openAnnounce("An error occured. Unable to submit the form.", "warning");
        }
    };
    
    // Init user loadind
    $scope.refreshUserList();	
  });
