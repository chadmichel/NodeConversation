(function() {
    "use strict";

    // Use winston for logging, might change this later.
    var winston = require("winston");

    winston.add(winston.transports.File, { filename: './logs/debug.log' });
     winston.remove(winston.transports.Console);

    winston.info("logging initialized");

    module.exports = winston;

}());