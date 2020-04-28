/**
 * @class log
 * @description Common module to create log using bunyan package
 */

const bunyan = require('bunyan')

const logLevel = process.env.LOG_LEVEL || 'info'
const logName = process.env.LOG_NAME || 'common'
const logger = bunyan.createLogger({
    name: logName,
    streams: [
        {
            level: 'info',
            stream: process.stdout            // log INFO and above to stdout
        },
        {
            level: 'error',
            path: '/Users/anilsanto/Desktop/platinum-card-apis/logs/myapp-error.log'  // log ERROR and above to a file
        }
    ]
})

module.exports = logger