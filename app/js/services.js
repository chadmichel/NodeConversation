'use strict';

var clientSocket = io.connect('http://localhost');

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chat.services', ['ngSocket'])
  	.service('ConversationApi', ['$window', 'ngWebSocket', function($window, ngWebSocket) {

		function ConversationApi() {
			var self = this;

			self.init = function () {
				var socket = io.connect('http://localhost');
				socket.emit("allActiveForUser", {my: "data"});
				socket.on('ConversationManager.allActiveForUser.result', function (data) {
					console.log(data);
				});
			};

		}

  		return new ConversationApi();
  	}]);
