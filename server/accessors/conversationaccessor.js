(function() {
    "use strict";

var q = require('q'),
    db = require('./db'),
    collection = "conversations";	


var singleton = { };

singleton.find = function(id) {	
    return db.find(collection, id);
};

singleton.save = function(conversation) {
    return db.save(collection, conversation);
};

singleton.findActiveForUser = function(userId) {
    return db.findMany(collection, { "users._id": userId });
};

singleton.findActive = function() {
    return db.findMany(collection, { active: true });
};

singleton.clearAll = function() {
    return db.clear(collection, { isTest: true})
};

singleton.fake = function() {

var conversations = 
    [
    { id: 1, title: "about nothing...", active: false },
    { id: 2, title: "more about nothing...", active: true}
    ];

    return conversations;
};

module.exports = singleton;

}());