#!/usr/bin/env node

var assert = require('assert'), 
    ua = require("../accessors/useraccessor.js"),
    db = require("../accessors/db.js");

db.useTest();

describe('userAccessor', function(){
	describe('find', function(){
		it('should return an object if it exists', function(done) {			
			ua.clearAll().then(function() {
				var obj = { email: "test@test.com"};
				ua.save(obj).then(function(result) {					
					ua.find(result._id).then(function(result2) {
						assert.equal(result.email, result2.email);
						done();
					});					
				});			
			});
		})
	})
});

describe('userAccessor', function(){
	describe('findByEmail', function(){
		it('should return an object if it exists', function(done) {			
			ua.clearAll().then(function() {
				var obj = { email: "test@test.com"};
				ua.save(obj).then(function(result) {					
					ua.findByEmail("test@test.com").then(function(result2) {
						assert.equal(result2[0].email, "test@test.com");
						done();
					});			
				});			
			});
		})
	})
});

describe('userAccessor', function(){
	describe('findByEmail failure', function(){
		it('should not return an object if it exists', function(done) {			
			ua.clearAll().then(function() {
				var obj = { email: "test@test.com"};
				ua.save(obj).then(function(result) {					
					ua.findByEmail("poop").then(function(result2) {
						assert.ok(result2.length == 0, "shouldn't have found anything");
						done();
					})      			
				});			
			});
		})
	})
});

describe('userAccessor', function(){
	describe('find all - one', function(){
		it('should return one user if only one users exists', function(done) {			
			ua.clearAll().then(function() {
				var obj = { email: "test@test.com"};
				ua.save(obj).then(function(result) {					
					ua.findAll().then(function(result2) {
						assert.equal(result2.length, 1);
						done();
					});					
				});			
			});
		})
	})
});

describe('userAccessor', function(){
	describe('find all - many', function(){
		it('should return many user if many users exists', function(done) {			
			ua.clearAll().then(function() {
				var obj = { email: "test@test.com"};
				ua.save(obj).then(function(result) {	
                    var obj2 = { email: "test2@test.com"};				
                    ua.save(obj2).then(function(result) {
					    ua.findAll().then(function(result2) {
						    assert.equal(result2.length, 2);
						    done();
					    });					
                    });
				});			
			});
		})
	})
});
