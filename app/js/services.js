'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chat.services', ['ngSocket'])

	.service('Comm', ['$rootScope', function($rootScope) {

		function Comm() {
			var self = this;
			self.socket = null;
			self.cache = {};


			self.connect = function() {

				if (self.socket != null) {
					return self.socket;
				} else {
					self.socket = io.connect('http://localhost');

					console.log("listening for message");

					self.socket.on('message', function(packet) {

						setTimeout(function() { 

							$rootScope.$apply(function() {
								packet = JSON.parse(packet);
								if (self.cache[packet.GUID] != null) {
									var item = self.cache[packet.GUID];
									if (item.resultFunction != null) {
										item.resultFunction(packet.result);
									}
								}
							});
						});
					});

					return self.socket;
				}
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

	}])

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
			//self.socket = null;

			self.conversations = [];

			self.init = function () {
				//self.socket = comm.connect();

				self.refreshList();
			};

			self.refreshList = function() {
				comm.send("findActive", {userId: userApi.myUserId()}, function(result) {
					self.conversations.length = 0;
					result.conversations.forEach(function(item) { 
						self.conversations.push(item);
					});
				});
			};

			self.activeConversations = function() {
				return self.conversations;
			};

			self.sendMessage = function(conversation, message) {				
				var promise = $q.defer();

				var isNew = conversation.isNew;								

				comm.send("sendMessage", {conversation: conversation, message: message, userId: userApi.myUserId()}, function(result) {
					if (isNew) {
						self.conversations.push(result.conversation);
					}

					$rootScope.$emit("receiveMessage", result.result);

					promise.resolve(result.result);					
				});

				return promise.promise;				
			};

			self.find = function(conversationId) {
				var findPromise = $q.defer();				

				comm.send("findConversation", { id: conversationId}, function(result) {					
					findPromise.resolve(result.conversation);
				});
				
				return findPromise.promise;
			};

			self.findMessages = function(conversationId) {
				var promise = $q.defer();

				comm.send("findMessages", { conversationId: conversationId }, function(result) {
					promise.resolve({conversationId: conversationId, messages: result.messages});
				});

				return promise.promise;				
			};

		}

  		return new ConversationApi();
  	}]);
