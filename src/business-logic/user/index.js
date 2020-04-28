const userSchema = require('../../models/user')
const custResponse = require('../../models/response')

const errorHandler = require('../error')
const session = require('../session')

const validator = require('../../common/validator')
const bcrypt = require('../../common/bcrypt')
const jwt = require('../../common/jwt')
const logger = require('../../common/log');

module.exports = {
    /**
     * @function create
     * @description Create User
     * @param {body} params 
     * @returns 
     */
    create: async (params) => {
        try {
            let { body } = params
            if (!body){
                throw Error('Bad Request')
            }
            let { password, email } = body
            if (!password && !validator.validatePassword(password)) {
                throw Error('Bad Request Password')
            }
            if (!email && !validator.validateEmail(email)) {
                throw Error('Bad Request Email')
            }
            let user = await userSchema.findOne({ email }).lean(true);
            if (user) {
                throw Error('duplicate')
            }
            const userData = new userSchema(body);
            await userData.save()
            return custResponse.success('User_Creation', 201, { id: userData._id })
        } catch (e) {
            logger.error(`Error on create new User - ${e}`);
            return errorHandler.failure(e)
        }
    },

    /**
     * @function Login
     * @description Login User
     * @param {body} params 
     * @returns 
     */
    validateUser: async (params) => {
        try {
            let { body } = params
            console.log(body)
            let { password, email } = body
            if (!password || !email) {
                throw Error('Bad Request')
            }
            let user = await userSchema.findOne({ email }).lean(true);
            if (!user){
                throw Error('Not Found')
            }
            let isMatch = await bcrypt.compare(user.password, password)
            if (!isMatch) {
                throw Error('Not Found')
            }
            const token = await jwt.createToken({ id: user._id }, process.env.JWT_SECRET)
            await session.create({ token })
            return custResponse.success('User_Login', 200, { token, email: user.email })
        } catch (e) {
            logger.error(`Error on Login - ${e}`);
            return errorHandler.failure(e)
        }
    }
}
