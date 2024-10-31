const { Events, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const appealData = require('../data/appealData')
const ms = require('ms')


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Base slash command interactions
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName)

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (err) {
                console.error(err);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true })
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
                }
            }
        } else if (interaction.isButton()) {
            
        }
    }
}