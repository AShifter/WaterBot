const moment = require('moment');
require('moment-duration-format');
const Discord = require("discord.js")
const CoreOutput = require("../core/CoreOutput.js")

module.exports.run = async (client, message, args) =>
{
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Uptime", `${client.botConfig.name} has been online for **${duration}**.`, "");
}
module.exports.help = 
{
    name: 'uptime',
    args: '[none]',
    notes: `Sends the uptime of WaterBot.`,
    category: 'Basic'
}