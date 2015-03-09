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
    socket.on('send:user:added', function (data) {
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
      * User form
      */
    $scope.user = {};
    $scope.user = function(){
        $scope.user = {
            name:{
                last:"",
                first:""
            },
            username:"",
            password:""
        };
    };
    
    $scope.isValid = function(model)
    {
        if(!model) return false;
        try {var value = eval("$scope." + model); } catch(e){ };
        if(typeof(value) == "undefined") return false;
        
        if(model == "user.username")
        {
            if( value.length ) return true;  
        }
        
        return false;
    }
    
    
    /** 	
      * Create user
      **/
	$scope.addUser = function(){
		socket.emit('get:user:add', { user:$scope.new_user });
	};
    
    // Init user loadind
    $scope.refreshUserList();	
  });
