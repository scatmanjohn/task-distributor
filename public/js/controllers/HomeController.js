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
     *      Receive an alert about someone changing users
     */
	socket.on('send:something-changed-user', function (data) {
        if(!data) data = {action:"unknow"};
        $scope.openAnnounce("Hey!", "Someone did something about users:" + data.action);
    });
    
    /**
	 *		Receive removed user response
	 */
    socket.on('send:user:removed', function (data) {
        $scope.successOrError(data, function(success, errors){
            $scope.setOverlay($("#dialog-new_user .modal-content"), false);
            if(success)
            {
                $scope.refreshUserList();
            }
        }, "User has been removed", "User has not been removed" );
    });    
    
    
    /**
	 *		Receive added user response
	 */
    socket.on('send:user:created', function (data) {
        $scope.successOrError(data, function(success, errors){
            $scope.setOverlay($("#dialog-new_user .modal-content"), false);
            if(success)
            {
                $scope.refreshUserList(); 
            }
        }, "User saved", "User not saved" );
    });
	
    
    /**
	 *		Receive added user response
	 */
    socket.on('send:user:fieldsaved', function (data) {
        $scope.successOrError(data, function(success, errors){
            $scope.setOverlay($("#dialog-new_user .modal-content"), false);
            if(!success)
            {
                $scope.refreshUserList(); 
            }
        }, "User saved", "User not saved" );
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
    $scope.new_user = {};
    $scope.createUserAction = function(){
        if($scope.forms.new_user && $scope.forms.new_user.$valid && $scope.new_user)
        {
            $scope.setOverlay($("#dialog-new_user .modal-content"), true);
            var user =  {
                name:{
                    last: $scope.new_user.lastname,
                    first: $scope.new_user.firstname
                },
                username: $scope.new_user.username,
                password: "password"
            };
            socket.emit("get:user:new", { user:user } );
        } else { 
            $("#new_user").modal('hide');
            $scope.openAnnounce("An error occured. Unable to submit the form.", "warning");
        }
    };
    
    /** 
     *  Edit user
     */
    $scope.fieldSaveUserAction = function(data, _id, field){
        socket.emit("get:user:fieldsave", { 
            data:data,
            id:_id,
            field:field
        } );
    };
    
    // Init user loadind
    $scope.refreshUserList();	
  });
