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
				
				socket.on('allActiveForUser_result', function (data) {
					console.log("result");
					console.log(data);
				});

				socket.on('comm_check', function(data) {	
					// a basic message has returned from the server, world probably ok.
					console.log("come check = " + data);
					if (data == true) {
						socket.emit("allActiveForUser", {hello: "world"});					
					}
				});
			};

		}

  		return new ConversationApi();
  	}]);
