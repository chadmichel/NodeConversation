'use strict';


// Declare app level module which depends on filters, and services
angular.module('chat', [
  'ngRoute',
  'chat.filters',
  'chat.services',
  'chat.directives',
  'chat.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/conversations/:id', 
  	{templateUrl: 'partials/conversations.html', controller: 'ConversationsCtrl'});  
  $routeProvider.when('/users/auth', 
  	{templateUrl: 'partials/auth.html', controller: 'UserCtrl'});  

  $routeProvider.when('/poop', 
    {templateUrl: 'partials/login.html', controller: 'AuthCtrl'});  

  
  $routeProvider.otherwise({redirectTo: '/conversations/new'});
}]);
