const logger = require('../common/log');
const user = require('../business-logic/user')

module.exports = (router) => {

    /**
    * @function Register
    * @method POST
    * @description Register User
    * @param {req} router 
    * @returns 
    */
    router.post('/user/register', async (req, res) => {
        try {
            let response = await user.create(req)
            res.status(response.statuscode).json(response.payload);
        } catch (e) {
            logger.error(`Error on ${e}`);
            res.status(500).json('Internal Error');
        }
    })
    /**
    * @function Login
    * @method POST
    * @description User Login
    * @param {req} router 
    * @returns 
    */
    router.post('/user/login', async (req, res) => {
        try {
            let response = await user.validateUser(req)
            res.status(response.statuscode).json((await response).payload);
        } catch (e) {
            logger.error(`Error on info api ${e}`);
            res.status(500).json('Internal Error');
        }
    })

    return router;
}