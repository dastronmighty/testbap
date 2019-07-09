const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 7,
        max: 64
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    affiliateCode: {
        type: String,
        required: true,
        min: 8,
        max: 32
    }
});

module.exports = mongoose.model('User', userSchema);