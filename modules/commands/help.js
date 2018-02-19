module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const fs = require("fs");
    var conf = JSON.parse(fs.readFileSync("./modules/config.json"));
	if (!args[0]) {
		let embed = new Discord.RichEmbed()
		let helpString = "";
		let commands = Array.from(client.commands.keys());
		commands.forEach(function (x) {
			helpString += x + '\n'
		});
		embed.setTitle(conf.name + " Help");
		embed.addField("List of available commands:", helpString)
        embed.setDescription(`For more information on a command, please use \`${conf.prefix}[command]\`.`);
        embed.setColor(conf.embedColor);
		message.channel.send({ embed });
	}
	else {
		let command = client.commands.get(args[0]);
		if (!command) return message.channel.send(`The command \`${args[0]}\` does not exist.`)
		let embed = new Discord.RichEmbed()
		embed.setTitle(`Help for ${args[0]}:`)
		embed.setDescription(command.help.notes)
        embed.addField('Parameters: ', command.help.args)
        embed.setColor(conf.embedColor);
		message.channel.send({ embed });
	}
}

module.exports.help = {
	name: "help",
	args: "[command] (optional)",
	notes: "Shows the commands."
}