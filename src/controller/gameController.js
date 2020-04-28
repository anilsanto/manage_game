const logger = require('../common/log');
const game = require('../business-logic/game')
const session = require('../business-logic/session')

module.exports = (router) => {

    /**
    * @function Create
    * @method POST
    * @description Create game
    * @param {req} router 
    * @returns 
    */
    router.post('/game/create', session.auth, async (req, res) => {
        try {
            let response = await game.create(req)
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
    router.post('/game/invite', session.auth, async (req, res) => {
        try {
            let response = await game.invite(req)
            res.status(response.statuscode).json((await response).payload);
        } catch (e) {
            logger.error(`Error on info api ${e}`);
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
    router.post('/game/remove-player', session.auth, async (req, res) => {
        try {
            let response = await game.removePlayer(req)
            res.status(response.statuscode).json((await response).payload);
        } catch (e) {
            logger.error(`Error on info api ${e}`);
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
    router.post('/game/update-player', session.auth, async (req, res) => {
        try {
            let response = await game.updatePlayerStatus(req)
            res.status(response.statuscode).json((await response).payload);
        } catch (e) {
            logger.error(`Error on info api ${e}`);
            res.status(500).json('Internal Error');
        }
    })
    /**
    * @function getGame
    * @method GET
    * @description get user game
    * @param {req} router 
    * @returns 
    */
    router.get('/game/get', session.auth, async (req, res) => {
        try {
            let response = await game.getGame(req)
            res.status(response.statuscode).json((await response).payload);
        } catch (e) {
            logger.error(`Error on info api ${e}`);
            res.status(500).json('Internal Error');
        }
    })

    return router;
}