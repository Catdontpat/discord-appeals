const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies w/ the latency of the Discord API'),
    async execute(interaction) {
        return interaction.reply(`Pong! Returned latency is: \`${itneraction.client.ws.ping}\`ms`)
    }
}