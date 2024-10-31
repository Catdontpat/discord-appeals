const path = require('path');
const fs = require('fs')
// Main Discord.js Client Implentations & Base express imports
const { Client, Events, GatewayIntentBits, REST, Collection, Routes } = require('discord.js');
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

// Command handler for seperate command files
const rest = new REST({ version: '10' }).setToken(token)
client.commands = new Collection()
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const commands = [];

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] | The following command in ${filePath} is missing data or proper executing properties to run`);
        }
    }
}

// Event handler for reading seperate files for each event that occurs
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) { 
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('ready', async () => {
    try {
        console.log(`[LOG] | Refreshing ${commands.length} application commands...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildID),
            { body: commands },
        );
        console.log(`≽^•⩊•^≼ | Successfully reloaded ${data.length} commands!`)
    } catch (err) {
        console.error(`≽^-⩊-^≼ | An error has occurred: ${err} `)
    }
})