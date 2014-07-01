var assert = require('assert'), 
    engine = require("../engines/converters.js");

describe('Converters', function(){
    describe('Conversation', function(){
        it('should convert to public', function(done) {			

            var conversation = {
                _id: "foo",
                title: "title"
            };

            var result = engine.conversationToPublic(conversation);
            assert(result != null);
            assert.equal(conversation._id, result.id);
            assert.equal(conversation.title, result.title);
            done();

        });
        it('should convert from public', function(done) {			

            var conversation = {
                id: "foo",
                title: "title"
            };

            var result = engine.conversationFromPublic(conversation);
            assert(result != null);
            assert.equal(conversation.id, result._id);
            assert.equal(conversation.title, result.title);
            done();

        });

        it('should convert empy to public', function(done) {			

            var conversation = {
            };

            var result = engine.conversationToPublic(conversation);
            assert(result != null);
            assert.equal("", result.id);
            assert.equal("", result.title);

            done();

        });
        it('should convert empty from public', function(done) {			

            var conversation = {
            };

            var result = engine.conversationFromPublic(conversation);
            assert(result != null);
            assert.equal("", result._id);
            assert.equal("", result.title);
            assert.equal("", result.userId);
            assert.equal("", result.userPictureUrl);
            done();

        });

        it('should convert null to public', function(done) {			

            var conversation = {
            };

            var result = engine.conversationToPublic(conversation);
            assert(result != null);
            assert.equal("", result.id);
            assert.equal("", result.title);

            done();

        });
        it('should convert null from public', function(done) {			

            var conversation = {
            };

            var result = engine.conversationFromPublic(conversation);
            assert(result != null);
            assert.equal("", result._id);
            assert.equal("", result.title);
            assert.equal("", result.userId);
            assert.equal("", result.userPictureUrl);
            done();

        });

        it('should convert null from public', function(done) {			

            var conversation = {
            };

            var result = engine.conversationFromPublic(conversation);
            assert(result != null);
            assert.equal("", result._id);
            assert.equal("", result.title);
            assert.equal("", result.userId);
            assert.equal("", result.userPictureUrl);
            done();

        });

        it('should convert array to public', function(done) {			

            var conversations = [
                {
                id: "foo",
                title: "title"
                }
            ];

            var result = engine.conversationToPublicArray(conversations);
            assert(result != null);
            assert.equal(1, result.length);            

            done();

        });

        it('should convert array from public', function(done) {			

            var conversations = [
                {
                id: "foo",
                title: "title"
                }
            ];

            var result = engine.conversationFromPublicArray(conversations);
            assert(result != null);
            assert.equal(1, result.length);            

            done();

        });

    });


    describe('Message', function(){
        it('should convert to public', function(done) {			

            var message = {
                _id: "foo",
                body: "body"
            };

            var result = engine.messageToPublic(message);
            assert(result != null);
            assert.equal(message._id, result.id);
            assert.equal(message.title, result.title);
            done();

        });
        it('should convert from public', function(done) {			

            var message = {
                id: "foo",
                body: "title"
            };

            var result = engine.messageFromPublic(message);
            assert(result != null);
            assert.equal(message.id, result._id);
            assert.equal(message.body, result.body);
            done();

        });

        it('should convert array to public', function(done) {			

            var messages = [
                {
                id: "foo",
                title: "title"
                }
            ];

            var result = engine.messageToPublicArray(messages);
            assert(result != null);
            assert.equal(1, result.length);            

            done();

        });

        it('should convert array from public', function(done) {			

            var messages = [
                {
                id: "foo",
                title: "title"
                }
            ];

            var result = engine.messageFromPublicArray(messages);
            assert(result != null);
            assert.equal(1, result.length);            

            done();

        });

    });
});

