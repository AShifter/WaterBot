const Discord = require('discord.js');

module.exports.run = async (client, message, args) =>
{
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
				embed.setColor(client.botConfig.embedColor)
				embed.setTitle(`${client.botConfig.name} ${client.botConfig.version} | Help`)
				embed.setDescription(`For more information about a specific command, use \`${client.botConfig.prefix}help [command]\``)
				message.channel.send({ embed });
		}
		else
		{
			let command = client.commands.get(args[0]);
            if (!command) return message.channel.send(`The command \`${args[0]}\` does not exist. Try ${client.botConfig.prefix}help for a list of commands!`);
            let embed = new Discord.RichEmbed();
            embed.setTitle(`Help for ${args[0]}:`);
            embed.setDescription(command.help.notes);
            embed.addField('Parameters: ', command.help.args);
            embed.addField('Category', command.help.category);
            embed.setColor(client.botConfig.embedColor);
            message.channel.send({ embed });
		}
	}catch(e)
	{
		console.log(e);
	}
}

module.exports.help = {
	name: "help",
	args: "[command] (optional)",
    notes: "Shows the commands.",
    category: 'Basic'
}