/**
 * @class sessionSchema
 * @description Define the model of session schema
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let sessionSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    createdAt: { type: Date, expires: process.env.TOKEN_EXPIRY, default: Date.now }

}, {
    timestamps: true
}, {
    collection: 'session'
});


module.exports = mongoose.model('sessions', sessionSchema);