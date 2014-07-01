(function() {
    "use strict";

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

singleton.clearAll = function() {
    return db.clear(collection)
};

singleton.findByEmail = function(email) {
    return db.findMany(collection, { email: email });
};

module.exports = singleton;

}());