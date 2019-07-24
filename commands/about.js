const Discord = require('discord.js');
const os = require('os');

module.exports.run = async (client, message, args) =>
{
    var mem = os.totalmem() / 1048576;
    var memfree = os.freemem() / 1048576;
    const embed = new Discord.RichEmbed()
    .setColor(client.botConfig.embedColor)
    .setTitle(`${client.botConfig.botName} ${client.botConfig.botVersion} | About`)
    .setDescription(`Here's (hopefully) everything you'll ever need to know about ${client.botConfig.botName};\n`)
    .addField("Programming",
            `${client.botConfig.botName}'s command handler, as well as the modules found in this bot were written by <@210794545015685121>. Many of the modules used in WaterBot for testing were written by the developer of the awesome PrecipitationJS bot, Richard Moch, under the MIT license. https://github.com/jtsshieh/precipitation-js`)
    .addField("License",
            `${client.botConfig.botName} is an open-source Discord moderation bot - its components are licensed under the MIT license. Basically, do whatever you want with it as long as you give credit back. Simple, right? https://github.com/AShifter/WaterBot`)
    .addField("Software",
            `${client.botConfig.botName} is currently running on ${os.type} ${os.arch} and NodeJS ${process.version}.`)
    .addField("Hardware",
            `${client.botConfig.botName} is currently running on this hardware:\n${os.cpus()[1].model}\n${Math.round(mem)}MB RAM (${Math.round(memfree)}MB free)\n`)
            message.channel.send({ embed });
}

module.exports.help =
{
  name: "about",
  args: "n/a",
  notes: "Credits and licensing information.",
  category: 'Misc',
  roleLevel: 0,
  absoluteRoleLevel: false
}
