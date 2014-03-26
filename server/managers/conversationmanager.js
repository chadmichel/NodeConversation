
var ca = require("../accessors/conversationAccessor.js"),
	ma = require("../accessors/messageaccessor.js"), 
	q = require('q');

function ConversationManager() {
	var self = this;
	
	self.findConversation = function(data) {
		return ca.find(data.id);
    };

    self.findActiveForUser = function(userId) {
    	return ca.findActiveForUser(userId);
    };

    self._addMessage = function(conversationId, messageText, userId) {
    	var message = { conversationId: conversationId, isTest: false, message: messageText, userId: userId };
    	return ma.save(message); // returns promise
    }

    self.sendMessage = function(data) {
    	var promise = q.defer(); 

    	if (data.conversation.isNew == true) {
    		var conversation = {
    			title: data.conversation.title.toString(),
    			userId: data.userId
    		};
    		ca.save(conversation).then(function(conversation) {
    			self._addMessage(conversation._id, data.message, data.userId).then(function(message) {
    				data.result = {
    					inserted: true,
    					conversation: conversation,
    					message: message
    				};

    				promise.resolve(data);
    			});
    		});
    	} else {
	    	ca.find(data.id).then(function(conversation) {
	    		self._addMessage(conversation._id, data.message, data.userId).then(function(message) {
	    			data.result = {
						inserted: true,
						conversation: conversation,
						message: message
	    			};

	    			promise.resolve(data);
	    		});
	    	});
		}
    	return promise.promise;
    };
}


module.exports = new ConversationManager();