#!/usr/bin/env node

var assert = require('assert');
var ca = require("../accessors/conversationAccessor.js");

describe('conversationAccessor', function(){
	describe('find', function(){
		it('should return an object if it exists', function(done) {			
			ca.clearTests().then(function() {
				var obj = { title: "test", isTest: true};
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
	describe('find active for user', function(){
		it('should return if customer is linked', function(done) {			
			ca.clearTests().then(function() {
				var obj = { title: "test", isTest: true, users: 
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
