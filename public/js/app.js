'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('TaskDistributorApp', [
  'ngRoute',
  'xeditable',    
    
  'TaskDistributorApp.MainControllers',
  'TaskDistributorApp.AdminControllers',
    
  'TaskDistributorApp.filters',
  'TaskDistributorApp.services',
  'TaskDistributorApp.directives',

  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
	when('/users', {
		templateUrl: 'partials/users',
		controller: 'UserController'
	}).
  	when('/home', {
		templateUrl: 'partials/home',
		controller: 'HomeController'
	}).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});


app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});