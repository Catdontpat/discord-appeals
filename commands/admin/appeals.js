const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js')
const appealData = require('../../data/appealData');
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
}

// TODO: Add a command for checking the past appeals of the users whom appeal on the site with their userID