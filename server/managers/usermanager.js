var ua = require("../accessors/useraccessor.js"),
    ma = require("../accessors/messageaccessor.js"), 
    q = require('q');

function UserManager() {
    var self = this;
    
    self.login = function(request, socket) {
        var deferred = q.defer();
        var response = {};

        ua.findByEmail(request.username).then(function(user) {
            if (user != null) {
                response.authenticated = true;
            }
            deferred.resolve(response);
        }.fail(function() {
            response.authenticated = false;
            deferred.resolve(response);
        });

        return deferred.promise();
    };

}

module.exports = new UserManager();