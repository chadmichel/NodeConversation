'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chat.services', ['ngSocket'])

	.service('Comm', function() {

		function Comm() {
			var self = this;
			self.socket = null;
			self.cache = {};


			self.connect = function() {

				if (self.socket != null) {
					return self.socket;
				} else {
					self.socket = io.connect('http://localhost');
					return self.socket;
				}

				self.socket.on('message', function(packet) {
					if (self.cache[packet.GUID] != null) {
						var item = self.cache[packet.GUID];
						if (item.resultFunction != null) {
							item.resultFunction(packet.data);
						}
					}
				});

			};

			self.send = function(messageType, data, resultFunction) {
				var packet = {
					GUID: createUUID(),
					MESSAGETYPE: messageType,
					data: data
				};
				
				self.cache[packet.GUID] = { MESSAGETYPE: messageType, data: data, resultFunction: resultFunction};

				console.log("sending" + packet);
				console.log(packet);
				var packetStr = JSON.stringify(packet);
				self.socket.send(packetStr);
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
  		['$window', 'ngWebSocket', '$rootScope',  '$q', 'UserApi', 'Comm', 
  		function($window, ngWebSocket, $rootScope, $q, userApi, comm) {

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

				self.socket.on('sendMessage_result', function(data) {
					console.log("message result");
				});
			};

			self.activeConversations = function() {
				return self.conversations;
			};

			self.sendMessage = function(conversation, message) {				
				userApi.myUserId();
				var promise = $q.defer();

				var isNew = conversation._id == null;

				comm.send("sendMessage", {id: conversation._id, message: message}, function(result) {
					if (isNew) {
						activeConversations.push(result.conversation);
					}
					promise.resolve(result);
				});

				return promise.promise;				
			};

			self.find = function(conversationId) {
				var findPromise = $q.defer();				

				comm.send("findConversation", { id: conversationId}, function(result) {				
					console.log(data);
					self.findPromise.resolve(result.conversation);
				});
				
				return findPromise.promise;
			};

		}

  		return new ConversationApi();
  	}]);
