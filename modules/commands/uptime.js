const moment = require('moment');
require('moment-duration-format');
const Discord = require("discord.js")
const { version } = require('discord.js');
module.exports.run = async (client, message, args) =>
{
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    var embed = new Discord.RichEmbed()
.setAuthor(`Uptime`)
.setColor('RANDOM')
.setDescription(`Uptime **>** ${duration}\n\n:desktop:`)
.setTimestamp();
    message.channel.send(embed);
}
module.exports.help = 
{
    name: 'uptime',
    args: '[none]',
    notes: `Sends the uptime of WaterBot.`,
    category: 'Basic'
}