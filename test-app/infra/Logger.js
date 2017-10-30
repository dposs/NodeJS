var winston = require("winston");
var CloudWatchTransport = require('winston-aws-cloudwatch')

/**
 * Logging Class (Singleton).
 * 
 * @class Logger
 * @extends {winston.Logger}
 */
class Logger extends winston.Logger {

    constructor() {
        throw new Error("Singleton classes can't be instantiated.");
    }

    /**
     * Get the instance of Logger.
     * Initializes a new one if no one is found.
     * 
     * @static
     * @param {JSON} log Log configuration
     * @returns 
     * @memberof Logger
     */
    static getInstance(log) {
        if (!Logger.instance) {
            Logger.initialize(log);
        }
        return Logger.instance;
    }

    /**
     * Initializes the Logger.
     * 
     * @static
     * @param {JSON} log Log configuration
     * @memberof Logger
     */
    static initialize(log) {
        winston.Logger.prototype.exception = (error, message) => {
            Logger.instance.error(message, {message: error.message, stack: error.stack});
        }
        
        Logger.instance = log ? new winston.Logger(log) : winston;
        
        Logger.instance.transports.console.formatter = Logger.formatter;
        Logger.instance.transports.file.formatter = Logger.formatter;
        Logger.instance.transports.cloudwatch._relay._client._formatter.formatLog = Logger.formatter;
    }

    /**
     * Returns the formatted timestamp.
     * 
     * @static
     * @returns {String} Formatted date
     * @memberof Logger
     */
    static timestamp() {
        var options = {
            weekday: 'long',
            day: 'numeric',
            year: 'numeric',
            month: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };

        return new Date(Date.now()).toLocaleDateString("pt-BR", options);
    }

    /**
     * Returns the formatted message according to Winston log options.
     * 
     * @static
     * @param {JSON} options 
     * @returns {String} Formatted message
     * @memberof Logger
     */
    static formatter(options) {
        var message = Logger.timestamp() + " " + 
            options.level.toUpperCase() + 
            (options.message && options.message != "undefined" ? " : " + options.message : "") + 
            (options.meta && Object.keys(options.meta).length ? "\n" + (options.meta.stack ? "Stacktrace: " + options.meta.stack : JSON.stringify(options.meta)) : '' );
            
        return options.colorize ? winston.config.colorize(options.level, message) : message;
    }
}

module.exports = Logger;