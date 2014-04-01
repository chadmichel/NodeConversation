var ca = require("../accessors/conversationAccessor.js"),
    ma = require("../accessors/messageaccessor.js"), 
    q = require('q');

function UserManager() {
    var self = this;
    
    self.findConversation = function(data) {
        return ca.find(data.id);
    };

}

module.exports = new UserManager();