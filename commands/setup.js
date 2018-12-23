const dotenv = require("dotenv").config({path:"../data/.env"});
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
        .setTitle(`${process.env.name} ${process.env.version} | Setup`)
        .setDescription(`Thank you for running Setup. Your guild has been cached!`)
		.setColor(process.env.embedColor)
		.setFooter(`${process.env.name} ${process.env.version}`)
        .setTimestamp();
		message.channel.send(embed);

		// Setup Response
		responseEmbed.setAuthor(`${process.env.name} ${process.env.version} | Setup`)
		responseEmbed.setDescription(`Next, Please send the name of the channel you wish to use for message logging.\n \(i.e. \`\`#logging\`\`\).`)
		responseEmbed.setColor(process.env.embedColor)
		responseEmbed.setFooter(`${process.env.name} ${process.env.version}`)
		responseEmbed.setTimestamp();
	}
	else if (arrayOfObjects.guilds[message.guild.id] != null && arrayOfObjects.guilds[message.guild.id].chatLogChannel == null)
	{
		responseEmbed.setAuthor(`${process.env.name} ${process.env.version} | Setup`)
		responseEmbed.setDescription(`That's odd! It looks like we already have your server in our database, but you haven't setup a logging channel. Please send the name of the channel you wish to use for message logging.\n \(i.e. \`\`#logging\`\`\).`)
		responseEmbed.setColor(process.env.embedColor)
		responseEmbed.setFooter(`${process.env.name} ${process.env.version}`)
		responseEmbed.setTimestamp();
	}
	else if (arrayOfObjects.guilds[message.guild.id] != null && arrayOfObjects.guilds[message.guild.id].chatLogChannel != null)
	{
		responseEmbed.setAuthor(`${process.env.name} ${process.env.version} | Setup`)
		responseEmbed.setDescription(`That's odd! It looks like we already have your server in our database, and a logging channel. If you need to, send the name of the channel you wish to use for message logging and I'll replace it for you.\n \(i.e. \`\`#logging\`\`\).`)
		responseEmbed.setColor(process.env.embedColor)
		responseEmbed.setFooter(`${process.env.name} ${process.env.version}`)
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
			.setAuthor(`${process.env.name} ${process.env.version} | Setup`)
			.setColor(process.env.embedColor)
			.setDescription(`Success! I am now using <#${cl.id}> for message logging.`)
			.setFooter(`${process.env.name} ${process.env.version}`)
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