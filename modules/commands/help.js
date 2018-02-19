module.exports.run = async (client, message, args, bot) =>
{
    const conf = require("../config.json");
	const Discord = require('discord.js');
	try
	{
		if(!args[0])
		{
			let categories = [];
			let commands = Array.from(client.commands.keys());
			const embed = new Discord.RichEmbed()
			
			commands.forEach(function (x) 
			{
				if (!categories.includes(client.commands.get(x).help.category))
				{
					//if (client.commands.get(x).help.category == "Owner Only") return;
					categories.push(client.commands.get(x).help.category);
				}
			});
	
			categories.forEach(function (x) 
			{
				let cat = '';
				commands.forEach(function (command) 
				{
					if (client.commands.get(command).help.category == x) 
					{
						cat = cat + command + '\n';
					}
				})
				embed.addField(x, cat, true);
			})
				embed.setColor(conf.embedColor)
				embed.setTitle(`${conf.name} ${conf.version} | Help`)
				embed.setDescription(`For more information about a specific command, use \`${conf.prefix}help [command]\``)
				message.channel.send({ embed });
		}
		else
		{
			let command = client.commands.get(args[0]);
            if (!command) return message.channel.send(`The command \`${args[0]}\` does not exist. Try ${conf.prefix}help for a list of commands!`);
            let embed = new Discord.RichEmbed();
            embed.setTitle(`Help for ${args[0]}:`);
            embed.setDescription(command.help.notes);
            embed.addField('Parameters: ', command.help.args);
            embed.addField('Category', command.help.category);
            embed.setColor(conf.embedColor);
            message.channel.send({ embed });
		}
	}catch(e)
	{
		message.channel.send("For some horrifying reason, we managed to mess up SO HARD that we couldn't show you a help screen. What a pity. Check the logs.");
		console.log(e);
	}
}

module.exports.help = {
	name: "help",
	args: "[command] (optional)",
    notes: "Shows the commands.",
    category: 'Basic'
}