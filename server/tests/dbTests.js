#!/usr/bin/env node

var assert = require('assert');
var db = require("../accessors/db.js");

describe('db', function(){
	describe('save', function(){
		it('should insert and return object', function(done) {
			db.clear("tester").then(function() {
				var obj = { name: "test"};
				db.save("tester", obj).then(function(result) {
					assert.equal(obj.name, result.name);
					done();
				});
			});
		})
	})
});

describe('db', function(){
	describe('count', function(){
		it('should return count of 1 for 1 object', function(done) {
			db.clear("tester").then(function() {
				var obj = { name: "test"};
				db.save("tester", obj).then(function(result) {
					assert.equal(obj.name, result.name);

					db.count("tester").then(function(count) {
						assert.equal(2, count);	
						done();
					});
				});
			});
		})
	})
});