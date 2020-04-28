/**
 * @class responseSchema
 * @description Define the model of api response
 */
module.exports = {
    success: (type,statusCode, payload) => {
        return {
            status: 'SUCCESS',
            statuscode: statusCode,
            payload
        };
    },
    failure: (errorCode, statusCode, errmsg) => {
        return {
            status: 'FAILURE',
            statuscode: statusCode,
            payload: {
                code: errorCode,
                message: errmsg
            }
        };
    }
};