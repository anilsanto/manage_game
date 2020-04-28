/**
 * @class healthCheck
 * @description This class to define health check endpoints
 */

const logger = require('../common/log');
const packageFile = require('../../package.json');

module.exports = (router) => {
    /**
    * @function /
    * @method Get
    * @description Gets profile api information
    * @param {req} router 
    * @returns 
    */
   router.get('/', async (req, res, next) => {
       try {
           let infoData = await { name: packageFile.name, status: 'OK', version: packageFile.version };
           res.status(200).json(infoData);
       } catch (e) {
           logger.error(`Error on info api ${e}`);
           next(e);
       }
   })

   return router;
}