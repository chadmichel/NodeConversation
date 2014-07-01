#!/usr/bin/env node

var assert = require('assert'),
    ca = require("../accessors/messageaccessor.js"),    
    db = require("../accessors/db.js");

db.useTest();

describe('MessageAccessor', function(){
	describe('find', function(){
		it('should return an object if it exists', function(done) {			
			ca.clearTests().then(function() {
				var obj = { conversationId: "1", isTest: true, message: 'something'};
				ca.save(obj).then(function(result) {					
					ca.find(result._id).then(function(result2) {
						assert.equal(result.message, result2.message);
						done();
					});					
				});			
			});
		})
	})
});

describe('MessageAccessor', function(){
	describe('find all for conversation', function(){
		it('should return if conversation is linked', function(done) {			
			ca.clearTests().then(function() {
				var obj = { conversationId: "1", isTest: true, message: 'something'};
				ca.save(obj).then(function(result) {					
					ca.findAllForConversation("1").then(function(result2) {						
						assert.equal(1, result2.length);
						done();
					});					
				});			
			});
		})
	})
});

describe('MessageAccessor', function(){
	describe('find all for conversation', function(){
		it('should NOT return if conversation is NOT linked', function(done) {			
			ca.clearTests().then(function() {
				ca.save({ conversationId: "1", isTest: true, message: 'something'}).then(function(result) {					
					ca.findAllForConversation("2").then(function(result2) {						
						assert.equal(0, result2.length);
						done();
					});					
				});			
			});
		})
	})
});

describe('MessageAccessor', function(){
	describe('find many for conversation if they exist', function(){
		it('should return if conversation is linked', function(done) {			
			ca.clearTests().then(function() {				
                var s1 = ca.save({ conversationId: "1", isTest: true, message: 'something1'});
                var s2 = ca.save({ conversationId: "1", isTest: true, message: 'something2'});
                s1.then(function() {	
                    s2.then(function() {
					    ca.findAllForConversation("1").then(function(result2) {			
						    assert.equal(2, result2.length);
						    done();
					    });					
                    });
				});			
			});
		})
	})
});