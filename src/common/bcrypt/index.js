const bcrypt = require('bcrypt')

module.exports = {
    /**
     * This method is used to encrypt the password
     * @param {*} source 
     * @param {*} destination 
     */
    encrypt : async function(password){
        return await bcrypt.hash(password, 8)
    },
    /**
     * This method is used to compare the passwords
     * @param {*} source 
     * @param {*} destination 
     */
    compare: async function(userPassword,password){
        return await bcrypt.compare(password, userPassword)
    }

}