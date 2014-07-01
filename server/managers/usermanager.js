(function() {
    "use strict";

var ua = require("../accessors/useraccessor.js"),
    ma = require("../accessors/messageaccessor.js"), 
    q = require('q');

function UserManager() {
    var self = this;
    
    self.login = function(request, notifier) {
        var deferred = q.defer();
        var response = { authenticated: false};

        ua.findByEmail(request.email).then(function(result) {   
            
            var user = null;
            if (result.length > 0)
                user = result[0];

            if (user != null) {
                if (user != null) {
                    response.authenticated = true;
                }            
                deferred.resolve(response);            
            } else {
                deferred.reject(response);
            }

        }).fail(function() {            
            response.authenticated = false;
            deferred.reject(response);
        });

        return deferred.promise;
    };

    self.create = function(request, notifier) {
        var deferred = q.defer();
      
        ua.save(request).then(function(result) {            

            try {
                var respondUser = {
                    email: result.email
                };
            
                notifier.respond(respondUser);                
                notifier.broadcast("BROADCAST_NEW_USER", respondUser);

                deferred.resolve(result);
            } catch (ex) {
                console.log(ex);
            }
        });

        return deferred.promise;
    };
}

module.exports = new UserManager();

}());