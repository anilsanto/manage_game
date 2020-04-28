const mongoose = require('mongoose');
const bcrypt = require('../common/bcrypt')

const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    avatar: {
        type: String
    }
})

userSchema.methods.toJSON = function() {
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.__v
    return userobject
}

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.encrypt(user.password)
    }
    next()
})

userSchema.virtual('users', {
    ref: 'games',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('players', {
    ref: 'games',
    localField: '_id',
    foreignField: 'players.userId'
})

module.exports = mongoose.model('users', userSchema);

