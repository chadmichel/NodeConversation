#!/usr/bin/env node

var assert = require('assert'), 
    um = require("../managers/usermanager.js"),
    ua = require("../accessors/useraccessor.js"),
    db = require("../accessors/db.js"),
    Notifier = require("../notifier.js");

db.useTest();

describe('UserManager', function(){
    describe('login', function(){
        it('should login if user exists', function(done) {			
            ua.clearAll().then(function() {
                var obj = { email: "login@test.com"};
                ua.save(obj).then(function(result) {					                    
                    um.login(result).then(function(result2) {
                        assert.equal(result2.authenticated, true);
                        done();
                    });			
                });			
            });
        })
    })
});

describe('UserManager', function(){
    describe('login', function(){
        it('should not login if user does not exist', function(done) {			
            ua.clearAll().then(function() {
                var obj = { email: "login@test.com"};
                ua.save(obj).then(function(result) {					                    
                    um.login({email: "login2@test.com"}).fail(function(result2) {                        
                        done();
                    });			
                });			
            });
        })
    })
});

describe('UserManager', function(){
    describe('create', function(){
        it('should create a new user', function(done) {			
            ua.clearAll().then(function() {
                var obj = { email: "login@test.com"};
                var notifier = new Notifier({MESSAGE_TYPE: 'TEST'});                      
                um.create(obj, notifier).then(function(result) {
                    //assert.notEqual(notifier.lastRespond, null);
                    // test user to see if it can login
                    um.login(result).then(function(result2) {                        
                        assert.equal(result2.authenticated, true);
                        done();
                    });			
                });			
            });
        })
    })
});

describe('Notifier', function(){
    describe('respond', function(){
        it("should set last respond", function(done) {
            var notifier = new Notifier({MESSAGE_TYPE: "TEST"});            
            notifier.respond({data:true});
            done();
        });
    });
});
