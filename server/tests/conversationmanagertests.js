#!/usr/bin/env node

var assert = require('assert'), 
    cm = require("../managers/conversationmanager.js"),
    ca = require("../accessors/conversationAccessor.js"),
    db = require("../accessors/db.js"),
    Notifier = require("../notifier.js");

db.useTest();

describe('ConversationManager', function(){

    describe('save', function(){
        it('should save conversation', function(done) {			
            ca.clearAll().then(function() {
                var obj = { conversation: { title: "test123"} };
                var notifier = new Notifier();
                cm.saveConversation(obj).then(function(result) {	
                    assert(result != null);
                    assert(result.id != null);
                    assert(result.id.length > 0);
                    assert.equal("test123", result.title);                        
                    done();                    
                });			
            });
        });
    });

    describe('find', function(){
        it('should find/load conversation', function(done) {			
            ca.clearAll().then(function() {
                var obj = { conversation: { title: "test123"} };
                var notifier = new Notifier();
                cm.saveConversation(obj).then(function(result) {	
                    cm.findConversation({ id: result.id}, notifier).then(function(loaded) {
                        done();                    
                    });                    
                });			
            });
        });
    });

    describe('findActive', function(){
        it('should find active conversations', function(done) {			
            ca.clearAll().then(function() {
                var obj = { conversation: { title: "test", active: true} };
                var notifier = new Notifier();
                cm.saveConversation(obj).then(function(result) {	
                    ca.findActive({}, notifier).then(function(loaded) {
                        assert.equal(1, loaded.length);
                        done();                    
                    });                    
                });			
            });
        });
    });

        describe('findActive', function(){
        it('should find no active conversations if none active', function(done) {			
            ca.clearAll().then(function() {
                var obj = { conversation: { title: "test", active: false} };
                var notifier = new Notifier();
                cm.saveConversation(obj).then(function(result) {	
                    ca.findActive({}, notifier).then(function(loaded) {
                        assert.equal(0, loaded.length);
                        done();                    
                    });                    
                });			
            });
        });
    });
});
