(function() {
    "use strict";

var ca = require("../accessors/conversationAccessor.js"),
    ma = require("../accessors/messageaccessor.js"),     
    converter = require("../engines/converters.js"),     
    q = require('q'),
    logger = require("../logger.js");

function ConversationManager() {
    var self = this;
    
    self.findConversation = function(request, notifier) {
        
        var deferred = q.defer();
        
        ca.find(request.id).then(function(loaded) {
            var cleaned = converter.conversationToPublic(loaded);
            deferred.resolve(cleaned);            
        }); 
                
        return deferred.promise;
    };

    self.saveConversation = function(request, notifier) {
        
        var deferred = q.defer();
        
        var conversation = converter.conversationFromPublic(request.conversation);
        ca.save(conversation).then(function(result) {            
            logger.info("Conversation saved id = " + result._id);
            var cleaned = converter.conversationToPublic(result);                        
            if (notifier != null) {                
                var responseData = { conversation: cleaned, note: "conversation saved"}                
                notifier.broadcast(notifier.CONVERSATION_NOTIFICATION, responseData);
            }
            deferred.resolve(cleaned);            
        });                    
        return deferred.promise;
    };

    self.findActiveForUser = function(request, notifier) {
            
        var deferred = q.defer();

        ca.findActiveForUser(request.userId).then(function(loaded) {
            var cleaned = converter.conversationToPublicArray(loaded);    
            deferred.resolve(cleaned);
        });                
        
        return deferred.promise;
    };

    self.findActive = function() {

        var deferred = q.defer();

        ca.findActive().then(function(loaded) {
            var cleaned = converter.conversationToPublicArray(loaded);    
            deferred.resolve(cleaned);
        });                

        return deferred.promise;
    };


    self.sendMessage = function(request, notifier) {

        if (request == null) {
            logger.info("new message but null request");
            return;
        } else if (request.conversation == null) {
            logger.info("new message but conversation is null");
            return;
        } else if (request.message == null) {
            logger.info("new message but message is null");
            return;
        }
        else {
            logger.info("new message " + request.message.body);
        }

        var deferred = q.defer();

        var message = converter.messageFromPublic(request.message);
        var conversation = converter.conversationFromPublic(request.conversation);

        if (request.isNew) {
            self.saveConversation(conversation, notifier).then(function(resultConversation) {
                if (resultConversation != null) {
                    message.conversationId = resultConversation.id;
                    ma.save(message).then(function(resultMessage) {
                        var cleanedMessage = converter.messageToPublic(resultMessage);
                        var responseData = { conversation: resultConversation, message: cleanedMessage, note: "New message added"}
                        if (notifier != null) {
                            notifier.broadcast(notifier.MESSAGE_NOTIFICATION, responseData);
                        }
                        deferred.resolve(responseData);
                    });
                }
            });
        } else {
            var loaded = ca.find(conversation._id).then(function(resultConversation) {
                if (resultConversation != null) {
                    message.conversationId = resultConversation.id;
                    ma.save(message).then(function(resultMessage) {
                        var cleanedMessage = converter.messageToPublic(resultMessage);
                        var responseData = { conversation: resultConversation, message: cleanedMessage, note: "New message added"}
                        if (notifier != null) {
                            notifier.broadcast(notifier.MESSAGE_NOTIFICATION, responseData);
                        }
                        deferred.resolve(responseData);
                    });
                }
            });
        }
        
        return deferred.promise;
    };
}


module.exports = new ConversationManager();

}());