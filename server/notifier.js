( function () {
    "use strict";

    var logger = require("./logger.js");

    function Notifier( packet ) {
        var self = this;

        self.CONVERSATION_NOTIFICATION = "CONVERSATION_NOTIFICATION";
        self.MESSAGE_NOTIFICATION = "MESSAGE_NOTIFICATION";

        self.packet = packet;
        self.lastRespond = null;
        self.lastBroadcast = null;
        if (self.packet != null) {
            self.MESSAGETYPE = self.packet.MESSAGETYPE;
        } else {
            self.MESSAGETYPE = "";
        }

        self.respond = function ( data ) {
            logger.info("Sending response " + self.MESSAGETYPE);

            self.lastRespond = {
                MESSAGETYPE: self.MESSAGETYPE,
                result: data
            };
            self.sendResponse();                       
        };

        self.broadcast = function ( messageType, data ) {

            logger.info("Sending broadcast " + messageType);

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