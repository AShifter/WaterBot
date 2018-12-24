const Discord = require('discord.js')
const fs = require('fs');

module.exports.run = (client, message, args) =>
{
	var responseEmbed = new Discord.RichEmbed()
	var content = fs.readFileSync('../data/guilds.json');
	let arrayOfObjects = JSON.parse(content);
	if (arrayOfObjects.guilds[message.guild.id] == null)
	{
		arrayOfObjects.guilds[message.guild.id] = {};
		fs.writeFileSync('../data/guilds.json', JSON.stringify(arrayOfObjects), 'utf8');
        var embed = new Discord.RichEmbed()
        .setTitle(`${client.botConfig.name} ${client.botConfig.version} | Setup`)
        .setDescription(`Thank you for running Setup. Your guild has been cached!`)
		.setColor(client.botConfig.embedColor)
		.setFooter(`${client.botConfig.name} ${client.botConfig.version}`)
        .setTimestamp();
		message.channel.send(embed);

		// Setup Response
		responseEmbed.setAuthor(`${client.botConfig.name} ${client.botConfig.version} | Setup`)
		responseEmbed.setDescription(`Next, Please send the name of the channel you wish to use for message logging.\n \(i.e. \`\`#logging\`\`\).`)
		responseEmbed.setColor(client.botConfig.embedColor)
		responseEmbed.setFooter(`${client.botConfig.name} ${client.botConfig.version}`)
		responseEmbed.setTimestamp();
	}
	else if (arrayOfObjects.guilds[message.guild.id] != null && arrayOfObjects.guilds[message.guild.id].chatLogChannel == null)
	{
		responseEmbed.setAuthor(`${client.botConfig.name} ${client.botConfig.version} | Setup`)
		responseEmbed.setDescription(`That's odd! It looks like we already have your server in our database, but you haven't setup a logging channel. Please send the name of the channel you wish to use for message logging.\n \(i.e. \`\`#logging\`\`\).`)
		responseEmbed.setColor(client.botConfig.embedColor)
		responseEmbed.setFooter(`${client.botConfig.name} ${client.botConfig.version}`)
		responseEmbed.setTimestamp();
	}
	else if (arrayOfObjects.guilds[message.guild.id] != null && arrayOfObjects.guilds[message.guild.id].chatLogChannel != null)
	{
		responseEmbed.setAuthor(`${client.botConfig.name} ${client.botConfig.version} | Setup`)
		responseEmbed.setDescription(`That's odd! It looks like we already have your server in our database, and a logging channel. If you need to, send the name of the channel you wish to use for message logging and I'll replace it for you.\n \(i.e. \`\`#logging\`\`\).`)
		responseEmbed.setColor(client.botConfig.embedColor)
		responseEmbed.setFooter(`${client.botConfig.name} ${client.botConfig.version}`)
		responseEmbed.setTimestamp();
	}
	
	message.channel.send(responseEmbed).then(() =>
	{
		message.channel.awaitMessages(m => m.author = message.author && m.mentions.channels.first(),
		{
			max: 1,
			maxMatches: 1
		}).then((collected) =>
		{
			let cl = collected.first().mentions.channels.first();
			fs.readFile("../data/guilds.json", function(e, content)
			{
				if (e) console.log(e);
				let arrayOfObjects = JSON.parse(content);
				arrayOfObjects.guilds[message.guild.id].chatLogChannel = cl.id;
				fs.writeFileSync("../data/guilds.json", JSON.stringify(arrayOfObjects), 'utf-8');
			})
			var embed = new Discord.RichEmbed()
			.setAuthor(`${client.botConfig.name} ${client.botConfig.version} | Setup`)
			.setColor(client.botConfig.embedColor)
			.setDescription(`Success! I am now using <#${cl.id}> for message logging.`)
			.setFooter(`${client.botConfig.name} ${client.botConfig.version}`)
			.setTimestamp()
			message.channel.send(embed)}).catch((e) =>
			{
				console.log(e)
			}
		);
	});

}

	


module.exports.help =
{
    name: 'setup',
    args: '[none]',
    notes: `Setup the bot's extended features.`,
    category: 'Misc'
}