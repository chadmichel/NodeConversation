
var ca = require("../accessors/conversationAccessor.js");

function ConversationManager() {
	var self = this;
	
	self.listen = function(socket) {

		socket.on('allActiveForUser', function (data) {
			ca.findActiveForUser(socket.userId).then(function(conversations) {		        
		        socket.emit("allActiveForUser_result", { conversations: conversations});
	    	});
	    });

	    socket.on('addMessage', function(data) {
	    	ca.find(data.id).then(function(conversation) {
	    		socket.emit("addMessage_result", { conversation: conversation});
	    	});
	    });

	};
}


module.exports = new ConversationManager();