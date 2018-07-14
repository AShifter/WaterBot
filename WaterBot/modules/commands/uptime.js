const conf = require("../config.json");
const moment = require('moment');
require('moment-duration-format');
const Discord = require("discord.js")
const { version } = require('discord.js');
module.exports.run = async (client, message, args) =>
{
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    var embed = new Discord.RichEmbed()
.setAuthor(`${conf.name} ${conf.version} | Uptime`)
.setColor(conf.embedColor)
.setDescription(`${conf.name} has been online for **${duration}**.`)
    message.channel.send(embed);
}
module.exports.help = 
{
    name: 'uptime',
    args: '[none]',
    notes: `Sends the uptime of WaterBot.`,
    category: 'Basic'
}