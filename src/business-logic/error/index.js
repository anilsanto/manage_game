const custResponse = require('../../models/response');
const custErrCode = require('../../common/constant/errorCode')

module.exports = {
    /**
     * @function create
     * @description Creates new category
     * @param {body} params 
     * @returns 
     */
    failure: (e) => {
        let errorCode = custErrCode.Internal_Error;
        let statusCode = 500;
        console.log(e.name)
        if (e.errors && e.errors.status && e.errors.status.name.includes("Validator")) {
            errorCode = custErrCode.Inproper_Entry;
            statusCode = 400;
        }
        else if (e.name.includes("ValidationError")) {
            errorCode = custErrCode.Inproper_Entry;
            statusCode = 400;
        } else if (e.message && e.message.includes("Bad Request")) {
            errorCode = custErrCode.Inproper_Entry;
            statusCode = 400;
        } else if (e.message && e.message.includes("Unauthorized")) {
            errorCode = custErrCode.UnAuthorized_Entry;
            statusCode = 401;
        } else if (e.message && e.message.includes('Not Found')) {
            errorCode = custErrCode.Not_Found;
            statusCode = 404;
        } else if (e.errmsg && e.errmsg.includes('duplicate')) {
            errorCode = custErrCode.Duplicate_Entry;
            statusCode = 409;
        }
        else if (e.message && e.message.includes('duplicate')) {
            errorCode = custErrCode.Duplicate_Entry;
            statusCode = 409;
        }
        return custResponse.failure(errorCode, statusCode, '');
    }


}