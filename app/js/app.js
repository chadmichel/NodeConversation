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
  $routeProvider.when('/poop', 
  	{templateUrl: 'partials/conversations.html', controller: 'ConversationsCtrl'});  
  
  //$routeProvider.otherwise({redirectTo: '/conversations/0'});
}]);
