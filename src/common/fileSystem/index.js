const fs = require('fs')
const fse = require('fs-extra')

module.exports = {
    readFile: function(filename) {
        try {
            const dataBuffer = fs.readFileSync(filename, 'utf8', (err, data) => {
                if (err) throw err
                return d
            })
            const dataJSON = dataBuffer.toString()
            return JSON.parse(dataJSON)
        } catch (e) {
            return []
        }
    },

    /**
     * This method is used to copy file, if folder does not exists then it will create folder as well
     * @param {*} source 
     * @param {*} destination 
     */
    copyFile: async function(source, destination) {
        try {
           await fse.copy(source, destination);
           return true;
        } catch (e) {
            return []
        }
    },

    /**
     * This method is used to remove file
     * @param {*} location 
     * @param {*} imageUrl 
     */
    removeFile: async function (location, imageUrl) {
        try {
            await fse.remove(location + imageUrl);
            return true;
        } catch (e) {
            return []
        }
    }
}