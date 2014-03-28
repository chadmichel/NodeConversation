'use strict';

/* Controllers */

angular.module('chat.controllers', []).
  controller('ConversationsCtrl',
  	['$scope', '$routeParams', '$location', '$rootScope', 'ConversationApi', 'UserApi',
  	function($scope, $routeParams, $location, $rootScope, conversationApi, userApi) {

		conversationApi.init();	 

	  	$scope.sendMessage = function() {

	  		var redirect = $routeParams.id === "new";
	  		conversationApi.sendMessage($scope.conversation, $scope.newMessageText).then(function(result) {
	  			
	  			if (redirect && result != null && result.conversation != null && result.conversation._id != null) {
	  				$location.path("/conversations/" + result.conversation._id);
	  			}
	  		});

	  	};

	  	$scope.open = function(conversation) {
	  		$location.path("/conversations/" + conversation._id);
	  		return false;
	  	};

	  	$scope.newConversation = function() {
	  		$location.path("/conversations/new");
	  	};

	  	$scope.myUserId = userApi.myUserId();

	  	$scope.conversations = conversationApi.activeConversations();
	  	$scope.conversation = null;

		$scope.messages = [];
	  	if ($routeParams.id === "new") {
	  		$scope.conversation = { title: "new title", isNew: true, userId: userApi.myUserId()};
	  	} else {
	  		conversationApi.find($routeParams.id).then(function(conversation) {
	  			if (conversation == null) {
	  				$scope.newConversation();
	  			} else {
		  			$scope.conversation = conversation;
		  			conversationApi.findMessages($routeParams.id).then(function(messages) {
		  				$scope.messages = messages;
		  			});
	  			}
	  		});
	  	}        

	  	$scope.newMessageText = "";

	  	console.log("route id = " + $routeParams.id);

  }]);
