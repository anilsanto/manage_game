const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let playerSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        unique: true,
        ref: "users"
    },
    status: {
        type: String,
        enum: ['Accepted', 'Invited', 'Rejected'],
        validate: function (val) {
            if (['Accepted', 'Invited', 'Rejected'].includes(val))
                return true
            return false
        }
    },
})

let gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    location: {
        name: {
            type: String,
            trim: true,
        },
        latinude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'In-Porgress', 'Ended', 'Cancelled'],
        validate: function (val) {
            if (['Scheduled', 'In-Porgress', 'Ended', 'Cancelled'].includes(val))
                return true
            return false
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    amount: {
        type: Number,
        required: true
    },
    players: [playerSchema]
},{ toJSON: { virtuals: true } })

gameSchema.virtual('player', {
    ref: 'users',
    localField: 'players.userId',
    foreignField: '_id'
})

module.exports = mongoose.model('games', gameSchema);