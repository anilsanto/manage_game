const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let paymentsSchema = new Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    originalAmount: {
        type: Number,
        required: true,
        default: 0.0
    },
    payedAmount: {
        type: Number,
        required: true,
        default: 0.0
    }
})