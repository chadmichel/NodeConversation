
var ca = require("../accessors/conversationAccessor.js");

function ConversationManager() {
	var self = this;
	
	self.listen = function(socket) {

		socket.on('allActiveForUser', function (data) {

			ca.findActiveForUser(socket.userId).then(function(conversations) {		        
		        socket.emit("allActiveForUser_result", { conversations: conversations});
	    	});
	    });

	};
}


module.exports = new ConversationManager();