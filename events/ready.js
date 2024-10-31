const { Events, ActivityType } = require('discord.js')


module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setPresence({
            activities: [{
                name: "Appeal submissions!",
                type: ActivityType.Watching
            }],
            status: "online"
        });

        console.log(`≽^•⩊•^≼ | Injected into: ${client.user.tag}! `)
    }
}