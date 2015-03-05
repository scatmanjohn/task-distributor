'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:appName', function (data) {
      $scope.appName = data.appName;
    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  }).
  controller('HomeCtrl', function ($scope, socket) {
	socket.on('send:user', function (data) {
      $scope.user = data.user;
    });
  });;
