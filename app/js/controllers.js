'use strict';

/* Controllers */

angular.module('chat.controllers', []).
  controller('ConversationsCtrl', 
  	['$scope', '$routeParams', '$location', '$rootScope', 'ConversationApi', 
  	function($scope, $routeParmas, $location, $rootScope, conversationApi) {

	  	conversationApi.init();

	  	$scope.conversations = conversationApi.activeConversations();

	  	$scope.open = function(conversation) {	  	
	  		console.log('open');
	  		$location.path("/conversations/" + conversation.id);		
	  		return false;
	  	};

  }]);