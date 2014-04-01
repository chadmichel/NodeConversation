var cm = new require('../server/managers/conversationmanager.js');
    

function Switchboard() {
    var self = this;


    self.listen = function(server) {

        self.io = require('socket.io').listen(server);

        self.io.sockets.on('connection', function(socket) {

        socket.userId = 1;
        socket.emit("comm_check", true);

            // initialize managers
            socket.on("message", function(packet) {
                packet = JSON.parse(packet);

                switch(packet.MESSAGETYPE) {
                case "findActiveForUser":
                    cm.findActiveForUser(packet.data.userId).then(function(conversations) {
                        console.log("sending back list");
                        packet.result = {conversations: conversations};
                        var packetStr = JSON.stringify(packet);
                        socket.send(packetStr); 
                    });
                    break;

               case "findActive":
                    cm.findActive().then(function(conversations) {
                        console.log("sending back list");
                        packet.result = {conversations: conversations};
                        var packetStr = JSON.stringify(packet);
                        socket.send(packetStr); 
                    });
                    break;                    

                case "findConversation":
                    cm.findConversation(packet.data).then(function(conversation) {
                        console.log("sending back");
                        packet.result = {conversation: conversation};
                        var packetStr = JSON.stringify(packet);
                        socket.send(packetStr); 
                    });
                    break;
                case "sendMessage":
                    console.log("sendMesage handler");
                    cm.sendMessage(packet.data).then(function(result) {
                        console.log("sending back");
                        packet.result = result;
                        var packetStr = JSON.stringify(packet);
                        console.log("send back after send message");
                        socket.send(packetStr); 
                    });
                    break;
                }
            });   
        });          

    };
}

module.exports = new Switchboard();
