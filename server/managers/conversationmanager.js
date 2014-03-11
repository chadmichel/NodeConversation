

function ConversationManager(socket) {
	var self = this;
	self.socket = socket;

    self.socket.on('allActiveForUser', function (data) {
        console.log("allActiveForUser");
        console.log(data);

        self.socket.emit("allActiveForUser_result", { data: 'hi'});
    });

	console.log("cm init");

	if (self.socket != null) {
		console.log("socket is not null");
	}
}


module.exports = ConversationManager;