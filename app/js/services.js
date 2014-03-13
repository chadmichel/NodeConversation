'use strict';





// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chat.services', ['ngSocket'])

	.service('Comm', function() {

		function Comm() {
			var self = this;
			self.socket = null;

			self.connect = function() {

				if (self.socket != null) {
					return self.socket;
				} else {
					self.socket = io.connect('http://localhost');
					return self.socket;
				}

			};
		}

		var c = new Comm();

		return c;

	})

	.service('UserApi', ['$window', 'ngWebSocket', '$rootScope', function($window, ngWebSocket, $rootScope) {

		function UserApi() {
			var self = this;
			self.myUser = {id: 1};

			self.myUserId = function() {
				return self.myUser.id;
			};
		}

		return new UserApi();

	}])
  	.service('ConversationApi', 
  		['$window', 'ngWebSocket', '$rootScope', 'UserApi', 'Comm', 
  		function($window, ngWebSocket, $rootScope, userApi, comm) {

		function ConversationApi() {
			var self = this;
			self.socket = null;

			self.conversations = [];

			self.init = function () {
				self.socket = comm.connect();
				
				self.socket.on('allActiveForUser_result', function (data) {
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

				self.socket.on('comm_check', function(data) {	
					// a basic message has returned from the server, world probably ok.
					console.log("come check = " + data);
					if (data == true) {
						self.socket.emit("allActiveForUser", {hello: "world"});					
					}
				});

				self.socket.on('addMessage_result', function(data) {
					console.log("message result");
				});
			};

			self.activeConversations = function() {
				return self.conversations;
			};

			self.addMessage = function(conversation, message) {
				userApi.myUserId();
				self.socket.emit('addMessage', {id: conversation._id, message: message});
			};

		}

  		return new ConversationApi();
  	}]);
