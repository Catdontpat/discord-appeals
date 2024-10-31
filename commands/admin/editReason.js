const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, ActionRowBuilder, ModalBuilder } = require('discord.js')
const appealData = require('../../data/appealData');

module.exports = {
    data: new SlashCommandBuilder()

}

// TODO: A slash command used to edit the reason of an appeal that's been reviewed!