
var ca = require("../accessors/conversationAccessor.js"),
	ma = require("../accessors/messageaccessor.js");

function ConversationManager() {
	var self = this;
	
	self.listen = function(socket) {

		socket.on('allActiveForUser', function (data) {
			ca.findActiveForUser(socket.userId).then(function(conversations) {		        
		        socket.emit("allActiveForUser_result", { conversations: conversations});
	    	});
	    });

	    socket.on('sendMessage', function(data) {
	    	ca.find(data.id).then(function(conversation) {

	    		var message = { conversationId: data.id, isTest: false, message: data.message };

	    		ma.save(message).then(function(result) {
	    			socket.emit("addMessage_result", { id: data.id, message: result});
	    		});
	    	});
	    });

	    socket.on('findConversation', function(data) {
	    	ca.find(data.id).then(function(conversation) {
	    		console.log("found for " + data.id);
	    		console.log(conversation);
	    		socket.emit("findConversation_result", { conversation: conversation});
	    	});
	    });

	};

	self.findConversation = function(data) {
		return ca.find(data.id);
    };
}


module.exports = new ConversationManager();