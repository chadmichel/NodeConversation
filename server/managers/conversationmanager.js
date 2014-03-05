

function ConversationManager(socket) {
	var self = this;
	self.socket = socket;

	self.socket.on('allActiveForUser', function() {
		console.log("active for user");
		emit([1, 2]);
	});

	console.log("cm init");
}


module.exports = ConversationManager;