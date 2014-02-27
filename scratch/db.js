#!/usr/bin/env node

var q = require('q');
var MongoClient = require('mongodb').MongoClient;

var singleton = { db: null, url: "mongodb://localhost:27017/conversations" };

// retrieve a database context.
singleton.getDB = function() {

    var deferred = q.defer();

    if (singleton.db != null) {
        setTimeout(function() {
            deferred.resolve(singleton.db);
        });
    } else {
        MongoClient.connect(singleton.url, function(err, db) {

            singleton.db = db;
            if(err) { return console.dir(err); }

            deferred.resolve(singleton.db);  
        });
    }

    return deferred.promise;
};

// Save a record to the database
singleton.save = function(collectionName, item) {
    var deferred = q.defer();

    singleton.getDB().then(function(db) {

        var collection = db.collection(collectionName);
        collection.save(item, {safe:true}, function(err, result) {
            if (err === null) {
                if (result === 1)
                    deferred.resolve(item);    
                else
                    deferred.resolve(result);
            } else {
                console.log("error processing save");
                deferred.reject(err);
            }
        });
    });

    return deferred.promise;   
};

// close the database
singleton.close = function() {
    MongoClient.close();
    singleton.db.close();
};


// access example
singleton.save("foo2", {name: "hi"}).then(function(result) {
    result.name = "blah";
    singleton.save("foo2", result).then(function(result) {
    });
});


