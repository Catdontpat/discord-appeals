const path = require('path');
// Main Discord.js Client Implentations & Base express imports
const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const token = require(process.env.TOKEN)
const clientID = require(process.env.CLIENTID)
const guildID = require(process.env.GUILDID)
var express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Strategy = require('.lib').Strategy;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildWebhooks]})

// Database Implement and connection for mongoose
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log(`≽^•⩊•^≼ | Connected to mongoDB!`))