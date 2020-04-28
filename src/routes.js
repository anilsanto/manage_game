/**
 * @class routes.js
 * @description Defines routes for platinum card api
 */

module.exports = (app, router) => {
    /**
     * @module controller
     * @description Route definition for health check module
     */
    app.use('/api/info', require('./controller/healthCheck')(router));

    /**
     * @module controller
     * @description Route definition for user module
     */
    app.use('/api', require('./controller/userController')(router));

    /**
     * @module controller
     * @description Route definition for game module
     */
    app.use('/api', require('./controller/gameController')(router));

}