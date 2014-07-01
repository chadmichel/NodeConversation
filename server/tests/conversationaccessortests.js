#!/usr/bin/env node

var assert = require('assert'),
    ca = require("../accessors/conversationAccessor.js"),
    db = require("../accessors/db.js"),
    q = require("q");

db.useTest();

describe('conversationAccessor', function(){
	describe('find', function(){
		it('should return a conversation if it exists', function(done) {			
			ca.clearAll().then(function() {
				var obj = { title: "test"};
				ca.save(obj).then(function(result) {					
					ca.find(result._id.toString()).then(function(result2) {
						assert.equal(result.title, result2.title);
						done();
					});					
				});			
			});
		})
	})
});

describe('conversationAccessor', function(){
	describe('findActive', function(){
		it('should return active conversation', function(done) {			
			ca.clearAll().then(function() {
				var obj = { title: "test", active: true};
				ca.save(obj).then(function(result) {					
					ca.findActive().then(function(result2) {
						assert.equal(1, result2.length);
						done();
					});					
				});			
			});
		})
	})
});

describe('conversationAccessor', function(){
	describe('findActive', function(){
		it('should not return inactive conversation', function(done) {			
			ca.clearAll().then(function() {
				var obj = { title: "test", active: false};
				ca.save(obj).then(function(result) {					
					ca.findActive().then(function(result2) {
						assert.equal(0, result2.length);
						done();
					});					
				});			
			});
		})
	})
});

describe('conversationAccessor', function(){
	describe('findActive', function(){
		it('should return many active conversation if they exist', function(done) {			
			ca.clearAll().then(function() {				
                var s1 = ca.save({ title: "test1", active: true});
                var s2 = ca.save({ title: "test2", active: true});
                // # example of promise 'all' #
                q.all([s1, s2]).done(function() {
                    ca.findActive().then(function(result2) {
						assert.equal(2, result2.length);
						done();
					});
                });		
			});
		})
	})
});

describe('conversationAccessor', function(){
	describe('find active for user', function(){
		it('should return if customer is linked', function(done) {			
			ca.clearAll().then(function() {
				var obj = { title: "test", active: true, users: 
					[ { id: 1, active: true }, 
					  { id: 2, active: true }, 
					  { id: 3, active: true }
					] };
				ca.save(obj).then(function(result) {					
					ca.findActiveForUser(2).then(function(result2) {
						assert.equal(1, result2.length);
						done();
					});					
				});			
			});
		})
	})
});

describe('conversationAccessor', function(){
	describe('find active for user', function(){
		it('should not return if customer is linked', function(done) {			
			ca.clearAll().then(function() {
				var obj = { title: "test", active: true, users: 
					[ { id: 1, active: true }, 					  
					  { id: 3, active: true }
					] };
				ca.save(obj).then(function(result) {					
					ca.findActiveForUser(2).then(function(result2) {
						assert.equal(0, result2.length);
						done();
					});					
				});			
			});
		})
	})
});