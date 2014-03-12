'use strict';

var clientSocket = io.connect('http://localhost');

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chat.services', ['ngSocket'])
  	.service('ConversationApi', ['$window', 'ngWebSocket', '$rootScope', function($window, ngWebSocket, $rootScope) {

		function ConversationApi() {
			var self = this;

			self.conversations = [];

			self.init = function () {
				var socket = io.connect('http://localhost');
				
				socket.on('allActiveForUser_result', function (data) {
					// we received a conversation update from server. 
					// Push this update.

					if (data != null && data.conversations != null) {

						$rootScope.$apply(function() {
							self.conversations.length = 0;

							data.conversations.forEach(function(c) {
								console.log(c.title);
								self.conversations.push(c);
							});
						});
					}
				});

				socket.on('comm_check', function(data) {	
					// a basic message has returned from the server, world probably ok.
					console.log("come check = " + data);
					if (data == true) {
						socket.emit("allActiveForUser", {hello: "world"});					
					}
				});
			};

			self.activeConversations = function() {
				return self.conversations;
			};

		}

  		return new ConversationApi();
  	}]);
