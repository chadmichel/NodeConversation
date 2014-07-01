( function () {
    "use strict";

    function Notifier( packet ) {
        var self = this;
        self.packet = packet;
        self.lastRespond = null;
        self.lastBroadcast = null;

        self.respond = function ( data ) {
            self.lastRespond = {
                MESSAGETYPE: packet.MESSAGETYPE,
                result: data
            };
            self.sendResponse();            
        };

        self.broadcast = function ( messageType, data ) {
            self.lastBroadcast = {
                MESSAGETYPE: messageType,
                result: data
            };
            self.sendBroadcast();            
        };

        self.sendResponse = function () {
        };

        self.sendBroadcast = function () {
        };
    }

    module.exports = Notifier;
} () );