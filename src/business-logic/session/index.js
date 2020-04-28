const jwt = require('jsonwebtoken');

const sessionSchema = require('../../models/session');
const logger = require('../../common/log');
const custResponse = require('../../models/response');
const errorHandler = require('../error')

module.exports = {
    /**
     * @function createSession
     * @description Creates new session
     * @param {body} params 
     * @returns 
     */
    create: async (params) => {
        try {
            let sessionData = sessionSchema(params)
            let sessionOut = await sessionData.save()
            return custResponse.success('Session_Creation', sessionOut);
        } catch (e) {
            logger.error(`Error on create new Session - ${e}`);
            return errorHandler.failure(e)
        }
    },
    /**
     * @function auth
     * @description Authenticate user session
     * @param {body} params 
     * @returns 
     */
    auth: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            let session = await sessionSchema.findOne({ token })
            const user = decoded;
            if (!session ) {
                throw Error('Unauthorized')
            }
            req.token = token
            req.user = user
            next()
        } catch (e) {
            logger.error(`Error on create new Session - ${e}`);
            let response = errorHandler.failure(e)
            res.status(response.statuscode).json(response);
        }
    },
    
    /**
     * @function delete
     * @description Delete user session
     * @param {body} params 
     * @returns 
     */
    delete: async (params) => {
        try {
            let session = await sessionSchema.findOneAndDelete({ token: params })
            return custResponse.success('Session_Clear', session);
        } catch (e) {
            logger.error(`Error on clear Session - ${e}`);
            return errorHandler.failure(e)
        }
    }
}