#!/usr/bin/env node

var q = require('q');
var MongoClient = require('mongodb').MongoClient;

var singleton = { db: null, url: "mongodb://localhost:27017/conversations" };

singleton.getDB = function() {

    var deferred = q.defer();

    if (singleton.db != null) {
        setTimeout(function() {
            deferred.resolve(singleton.db);
        });
    } else {
        MongoClient.connect(singleton.url, function(err, db) {

            singleton.db = db;

            console.log("connected");

            if(err) { return console.dir(err); }

            deferred.resolve(singleton.db);  
        });
    }

    return deferred.promise;
};

singleton.insert = function(collectionName, item) {
    var deferred = q.defer();

    singleton.getDB().then(function(db) {

        console.log("got db");

        var collection = db.collection(collectionName);
        collection.insert(item, {w:1}, function(err, result) {
            console.log("inserted " + result[0]._id);        

            deferred.resolve(result);
        });
    });

    return deferred.promise; 
};


singleton.insert("foo", {name: "hi"});


