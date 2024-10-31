const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userID: Number,
    userTag: String,
    reasons: {
        type: Map,
        of: String,
    },
    Status: String,
    reason: String,
    caseNumber: Number,
    reduceTime: String,
})

module.exports = mongoose.model('appealdata', Schema);