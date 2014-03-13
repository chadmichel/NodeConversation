#!/usr/bin/env node

var q = require('q'),
	db = require('./db'),
	collection = "messages";	

var singleton = { };

singleton.find = function(id) {
	return db.find(collection, id);
};

singleton.save = function(conversation) {
	return db.save(collection, conversation);
};

singleton.findAllForConversation = function(conversationId) {
	return db.findMany(collection, { conversationId: conversationId });
};

singleton.clearTests = function() {
	return db.clear(collection, { isTest: true})
};

module.exports = singleton;
