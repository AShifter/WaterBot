const Discord = require('discord.js')
const fs = require('fs');
const conf = require("../config.json")

module.exports.run = async (client, message, args) =>
{
	fs.readFile('./modules/guilds.json', function(err, content)
	{
		if (err) console.log(err);
		let arrayOfObjects = JSON.parse(content);
		if (arrayOfObjects.guilds[message.guild.id] == null)
		{
            arrayOfObjects.guilds[message.guild.id] = {};
			fs.writeFile('./modules/guilds.json', JSON.stringify(arrayOfObjects), 'utf-8');

            var embed = new Discord.RichEmbed
            .setTitle(`${conf.name} ${conf.version} | Setup`)
            .setDescription(`Thank you for starting Setup. Your guild has been cached.`)
            .setColor(conf.embedColor)
            .setFooter(`${conf.name} ${conf.version}`)
            .setTimestamp();
            message.channel.send(embed);
		}
	}).then(() =>
	{
        var embed = new Discord.RichEmbed()
        .setAuthor(`${conf.name} ${conf.version} | Setup`)
        .setDescription(`Next, Please send the name of the channel you wish to use for message logging.\n \(i.e. #logging\).`)
        .setColor(conf.embedColor)
        .setFooter(`${conf.name} ${conf.version}`)
        .setTimestamp();
		message.channel.send(embed).then(() =>
		{
			message.channel.awaitMessages(m => m.author = message.author && m.mentions.channels.first(),
			{
				max: 1,
				maxMatches: 1
			}).then((collected) =>
			{
				let cl = collected.first().mentions.channels.first();
				fs.readFile("./modules/guilds.json", function(e, content)
				{
					if (e) console.log(e);
					let arrayOfObjects = JSON.parse(content);
					arrayOfObjects.guilds[message.guild.id].chatLogChannel = cl.id;
					fs.writeFile("./modules/guilds.json", JSON.stringify(arrayOfObjects), 'utf-8');
				})
				var embed = new Discord.RichEmbed().setAuthor(`${conf.name} ${conf.version} | Setup`).setColor(conf.embedColor).setDescription(`Success! I am now using <#${cl.id}> for message logging.`).setFooter(`${conf.name} ${conf.version}`).setTimestamp()
				message.channel.send(embed)
			}).catch((e) =>
			{
				console.log(e)
			});
		})
	});
}

module.exports.help =
{
    name: 'setup',
    args: '[none]',
    notes: `Setup the bot's extended features.`,
    category: 'Misc'
}