module.exports.run = async (client, message, args) =>
{
    const conf = require("../config.json");
    const Discord = require('discord.js');
    const os = require('os');

    var mem = os.totalmem() / 1048576;
    var memfree = os.freemem() / 1048576;
    const embed = new Discord.RichEmbed()
    .setColor(conf.embedColor)
    .setTitle(`${conf.name} ${conf.version} | About`)
    .setDescription(`${conf.name} was made possible by the following:\n`)
    .addField("Programming",
            `${conf.name}'s command handler, as well as the modules found in this bot were written by <@210794545015685121>. Many of the modules used in WaterBot for testing were written by <@228271067821506560> under the MIT license. Special credit goes to him for motivating me to write this bot.`)
    .addField("License",
            `${conf.name} is an open-source Discord moderation bot - it's components are licensed under the MIT license. Basically, do whatever you want with it as long as you give credit back. Simple, right? https://github.com/AShifter/WaterBot`)
    .addField("Software",
            `${conf.name} is currently running on ${os.type} ${os.arch} and NodeJS ${process.version}.`)
    .addField("Hardware",
            `${conf.name} is currently running on this hardware:\n${os.cpus()[1].model}\n${Math.round(mem)}MB RAM (${Math.round(memfree)}MB free)\n`)
            message.channel.send({ embed });
}

module.exports.help = {
	name: "about",
	args: "n/a",
    notes: "Credits and licensing information.",
    category: 'Misc'
}