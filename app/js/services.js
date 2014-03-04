'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chat.services', ['ngSocket'])
  	.service('ConversationApi', ['$window', 'ngWebSocket', function($window, ngWebSocket) {

		function ConversationApi() {
			var self = this;

			self.init = function () {

			};

		}

  		return new ConversationApi();
  	}]);
