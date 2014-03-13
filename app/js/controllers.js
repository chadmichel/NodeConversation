'use strict';

/* Controllers */

angular.module('chat.controllers', []).
  controller('ConversationsCtrl', 
  	['$scope', '$routeParams', '$location', '$rootScope', 'ConversationApi', 'UserApi', 
  	function($scope, $routeParmas, $location, $rootScope, conversationApi, userApi) {

	  	conversationApi.init();

	  	$scope.myUserId = userApi.myUserId();

	  	$scope.conversations = conversationApi.activeConversations();
	  	$scope.conversation = { title: "--"};

	  	$scope.messages = [
	  		{id: 1, message: 'hello', userId: 1, userImage: "/img/user.png"},
	  		{id: 2, message: 'hello', userId: 2, userImage: "/img/user.png"}
	  	];

	  	$scope.newMessageText = "";

	  	console.log("route id = " + $routeParmas.id);

	  	$scope.newMessage = function() {
	  		
	  		conversationApi.addMessage($scope.conversation, $scope.newMessageText);

	  	};

	  	$scope.open = function(conversation) {	  	
	  		console.log('open');
	  		$location.path("/conversations/" + conversation._id);		
	  		return false;
	  	};

	  	conversationApi.find($routeParmas.id).then(function(conversation) {
	  		console.log("found " + conversation._id);
	  	});

  }]);