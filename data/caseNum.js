const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guildID: Number,
    caseNumber: Number,
})

module.exports = mongoose.model('guild', Schema);