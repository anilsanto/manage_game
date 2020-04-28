const mongoose = require('mongoose');

const gameSchema = require('../../models/game')
const custResponse = require('../../models/response')

const errorHandler = require('../error')
const logger = require('../../common/log');

module.exports = {
    /**
     * @function create
     * @description Create Game
     * @param {body} params 
     * @returns 
     */
    create: async (params) => {
        try {
            let { body } = params
            let { user } = params
            if (!body.title || !body.startTime || !body.endTime || !body.amount) {
                throw Error('Bad Request')
            }
            let gameData = new gameSchema(body)
            gameData.owner = user.id
            await gameData.save()
            return custResponse.success('Game_Creation', 201, { id: gameData._id })
        } catch (e) {
            logger.error(`Error on create game profile - ${e}`);
            return errorHandler.failure(e)
        }
    },

    invite: async (params) => {
        try {
            let { body } = params
            let { id, player } = body
            let { user } = params
            if (!id || !player) {
                throw Error('Bad Request')
            }
            let gameOut = await gameSchema.findOne({ _id: id, owner: user.id})
            if (!gameOut) {
                throw Error('Not Found')
            }
            let game = await gameSchema.updateOne({ _id: id, owner: user.id, 'players.user' : {$ne: player.user} },
                { $addToSet: { 'players': { '$each': [player] } } },
                { runValidators: true })
                
            let out = await gameSchema.findOne({ _id: id }).populate({
                path: 'players.user',
                model: 'users'
            }).exec()
            return custResponse.success('Game_Invite', 200, out)
        } catch (e) {
            logger.error(`Error on invite - ${e}`);
            return errorHandler.failure(e)
        }
    },

    updatePlayerStatus: async (param) => {
        try {
            let { body } = param
            let { id, playerId, status } = body
            let { user } = param
            let game = await gameSchema.updateOne({ _id: id, owner: user.id, 'players.user': playerId },
                { $set: { 'players.$.status': status } },
                { runValidators: true })
            let out = await gameSchema.findOne({ _id: id }).populate({
                path: 'players.user',
                model: 'users'
            }).exec()
            return custResponse.success('Game_Update_player', 200, out)
        } catch (e) {
            logger.error(`Error on update player status - ${e}`);
            return errorHandler.failure(e)
        }
    },

    getGame: async (params) => {
        try {
            let { user } = params
            let games = await gameSchema.find({ "players.user": { $in: [user.id] }, }).populate({
                path: 'players.user',
                model: 'users'
            }).exec();
            return custResponse.success('Game_GET', 200, games)
        } catch (e) {
            logger.error(`Error on GET game - ${e}`);
            return errorHandler.failure(e)
        }
    },

    removePlayer: async (param) => {
        try {
            let { user } = param
            const { body } = param;
            const { id, playerId } = body;
            console.log(body)
            if (!id || !playerId) {
                throw Error('Bad Request')
            }
            let games = await gameSchema.updateOne({ _id: id, owner: user.id }, {
                $pull: { 'players': { 'user': playerId } }
            }, { multi: true })
            let out = await gameSchema.findOne({ _id: id }).populate({
                path: 'players.user',
                model: 'users'
            }).exec()
            return custResponse.success('Game_Remove_Player', 200, out)
        }
        catch (e) {
            logger.error(`Error on game remove player - ${e}`);
            return errorHandler.failure(e)
        }
    },

    delete: async (param) => {
        try {
            let { user } = param
            const { params } = param;
            const { id } = params;
            if (!params || !id) {
                throw Error('Bad Request')
            }
            let owner = mongoose.Types.ObjectId(user.id);
            let _id = mongoose.Types.ObjectId(id);
            await gameSchema.deleteOne({ _id, owner })
            return custResponse.success('Delete_Game');
        } catch (e) {
            logger.error(`Error on delete - ${e}`);
            return errorHandler.failure(e)
        }
    }


}
