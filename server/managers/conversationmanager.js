(function() {
    "use strict";

var ca = require("../accessors/conversationAccessor.js"),
    ma = require("../accessors/messageaccessor.js"),     
    converter = require("../engines/converters.js"),     
    q = require('q');

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
            var cleaned = converter.conversationToPublic(result);            
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


    self.sendMessage = function(data) {
        var promise = q.defer(); 

        setTimeout(function() { 
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
                ca.find(data.conversation._id).then(function(conversation) {
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
        });
        return promise.promise;
    };
}


module.exports = new ConversationManager();

}());