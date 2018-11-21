const dotenv = require("dotenv").config({path:"./.env"});
const moment = require('moment');
require('moment-duration-format');
const Discord = require("discord.js")
const CoreOutput = require("../core/CoreOutput.js")

module.exports.run = async (client, message, args) =>
{
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    CoreOutput.SendEmbed(message.channel, process.env.embedColor, "Uptime", `${process.env.name} has been online for **${duration}**.`, "");
}
module.exports.help = 
{
    name: 'uptime',
    args: '[none]',
    notes: `Sends the uptime of WaterBot.`,
    category: 'Basic'
}