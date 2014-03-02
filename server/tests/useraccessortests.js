#!/usr/bin/env node

var assert = require('assert');
var ua = require("../accessors/useraccessor.js");

describe('userAccessor', function(){
	describe('find', function(){
		it('should return an object if it exists', function(done) {			
			ua.clearTests().then(function() {
				var obj = { username: "test", isTest: true};
				ua.save(obj).then(function(result) {					
					ua.find(result._id).then(function(result2) {
						assert.equal(result.username, result2.username);
						done();
					});					
				});			
			});
		})
	})
});

describe('userAccessor', function(){
	describe('find all', function(){
		it('should return if users  exist', function(done) {			
			ua.clearTests().then(function() {
				var obj = { username: "test", isTest: true};
				ua.save(obj).then(function(result) {					
					ua.findAll().then(function(result2) {
						assert(result2.length > 0);
						done();
					});					
				});			
			});
		})
	})
});
