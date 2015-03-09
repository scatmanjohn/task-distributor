'use strict';

/* Controllers */

angular.module('TaskDistributorApp.MainControllers', []).
  controller('AppCtrl', function ($scope, $timeout, socket) {
    socket.on('send:appName', function (data) {
      $scope.appName = data.appName;
    });
    
    
    // Alerts management
    $scope.announces = [];
    
    $scope.openAnnounce = function(message, type){
        if(! /warning|danger|success/i.test(type))
            type = "warning";   
        
        var id = $scope.announces.length;
        $scope.announces[id] = {_id: id, open:true, message:message, type:type };
        
        // Timeout to close automatically the alert
        $timeout(function(){
            $scope.closeAnnounceSlowly(id);
        }, 2000);
    };
    
    $scope.closeAnnounceSlowly = function(id)
    {
        $(".announce-" + id).animate({
            opacity:0,
            height:0,
            padding:0
        }, 1000).css("overflow", "hidden");
        
        $timeout(function(){
            $scope.closeAnnounce(id); 
        }, 1000);
    }
    
    $scope.closeAnnounce = function(id){
        console.log($scope.announces);
        if( $scope.announces[id])
        {
            $scope.announces[id].open = false;
            //$scope.announces.splice(id, 1);
        }
    }
    
    
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });



// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}