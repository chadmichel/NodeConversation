'use strict';

/* Controllers */

angular.module('chat.controllers', []).
  controller('ConversationsCtrl', 
  	['$scope', '$routeParams', '$location', '$rootScope', 'ConversationApi', 
  	function($scope, $routeParmas, $location, $rootScope, conversationApi) {

  		console.log($location.path());
	  	console.log("id " + $routeParmas.id);

	  	conversationApi.init();

	  	$scope.conversations = [
	  		{ id: 1, title: "about nothing...", active: false },
	  		{ id: 2, title: "more about nothing...", active: true}
	  		];

	  	$scope.open = function(conversation) {	  	
	  		console.log('open');
	  		$location.path("/conversations/" + conversation.id);		
	  		return false;
	  	};

  }]);