#!/usr/bin/env node

var q = require('q'),
	db = require('./db'),
	collection = "users";


var singleton = { };

singleton.find = function(id) {
	return db.find(collection, id);
};

singleton.save = function(conversation) {
	return db.save(collection, conversation);
};

singleton.findAll = function() {
	return db.findMany(collection);
};

singleton.clearTests = function() {
	return db.clear(collection, { isTest: true})
};

module.exports = singleton;
