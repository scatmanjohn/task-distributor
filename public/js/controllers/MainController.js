'use strict';

/* Controllers */

angular.module('TaskDistributorApp.MainControllers', []).
  controller('AppCtrl', function ($scope, $timeout, socket) {
    socket.on('send:appName', function (data) {
      $scope.appName = data.appName;
    });
    
    $scope.setOverlay = function(element, value)
    {
        if(typeof(value) == "undefined")
        {
            if(element.hasClass("isLoading"))
                value = false;
            else value = true;
        }
        else if(! /true/i.test(value))
            value = false;
        
        if(value)
        {
            element.addClass("isLoading");
            element.block({message:"Loading"});
        } else {
            element.removeClass("isLoading");
            element.unblock();
        }
    }
    
    // Forms
    $scope.forms = {};
    
    // Alerts management
    $scope.announces = [];
    
    $scope.successOrError = function(data, callback, successMsg, errorMsg)
    {
        if(data && data.success)
        {
            $scope.openAnnounce("Success!", successMsg, "success");
            if(callback) callback(true);
        }
        else if(data.message && data.message.errors)
        {
            $scope.openAnnounce(errorMsg, data.message.message, "warning");
            
            for(var i in data.message.errors)
            {
                 $scope.openAnnounce("Error "+ i, data.message.errors[i].message);   
            }
            if(callback) callback(false, data.message.errors);
            
        } else {
            $scope.openAnnounce("Be careful!", errorMsg, "error:" + data.message);
            if(callback) callback(false, []);
        }
    }
    
    $scope.openAnnounce = function(title, message, type){
        if(! /warning|error|success/i.test(type))
            type = "warning";   
        
        var id = $scope.announces.length;
        $scope.announces[id] = {_id: id, open:true, message:message, title:title, type:type };
        
        // Timeout to close automatically the alert
        $timeout(function(){
            $scope.closeAnnounceSlowly(id);
        }, 4000);
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