(function() {
    "use strict";

var q = require('q'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

var singleton = { db: null, url: "mongodb://localhost:27017/conversations", isTest: false };

singleton.useTest = function() {
    singleton.url = "mongodb://localhost:27017/conversationstests";
    singleton.isTest = true;
};

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

singleton.makeObjectId = function(id) {
    if (typeof id === 'string')
    {
        // convert to object id
        id = new ObjectID(id);
    }
    return id;
};

// Save a record to the database
singleton.save = function(collectionName, item) {

    var deferred = q.defer();

    if (item != null && singleton.isTest) {
        item.isTest = true;
    }

    if (item != null) {
        if (item._id != null && item._id.toString().length == 0)
            item._id = null;
    }

    singleton.getDB().then(function(db) {

        var collection = db.collection(collectionName);
        collection.save(item, {safe:true}, function(err, result) {
            if (err === null) {
                if (result === 1)
                    deferred.resolve(item);    
                else
                    deferred.resolve(result);
            } else {
                deferred.reject(err);
            }
        });
    });

    return deferred.promise;   
};

// Find a record to the database
singleton.find = function(collectionName, id) {    

    var deferred = q.defer();

    if (id == null || id == "new") {
        setTimeout(function() { 
            deferred.reject("no id");        
        });
    }
    else {

        id = singleton.makeObjectId(id);    

        singleton.getDB().then(function(db) {

            var collection = db.collection(collectionName);

            collection.findOne({ _id: id}, function(err, result) {            
                if (err === null) {
                    deferred.resolve(result);
                } else {
                    deferred.reject(err);
                }
            });
        });
    }
    return deferred.promise;   
};

// Find a record to the database
singleton.findMany = function(collectionName, query) {
    var deferred = q.defer();

    singleton.getDB().then(function(db) {

        var collection = db.collection(collectionName);
        collection.find(query).toArray(function(err, result) {        
            if (err === null) {
                deferred.resolve(result);
            } else {
                deferred.reject(err);
            }
        });
    });

    return deferred.promise;   
};

singleton.clear = function(collectionName, query) {
    var deferred = q.defer();

    singleton.getDB().then(function(db) {

        var collection = db.collection(collectionName);
        collection.remove(query, null, function(err, result) {
            if (err === null) {
                deferred.resolve();
            } else {                
                deferred.reject(err);
            }
        });
    });

    return deferred.promise;   
};

singleton.count = function(collectionName) {
    var deferred = q.defer();

    singleton.getDB().then(function(db) {

        var collection = db.collection(collectionName); 

        collection.count(function(err, count) {
            console.log(err);
            if (err === null) {
                deferred.resolve(count);
            } else {                
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

module.exports = singleton;

}());