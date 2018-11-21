const Discord = require('discord.js')
const fs = require('fs');

module.exports.run = async (client, message, args) =>
{
	let kickUser = message.mentions.members.first();
	if (message.member.hasPermission("KICK_MEMBERS"))
	{
		var embed = new Discord.RichEmbed()
			.setAuthor(`${conf.name} ${conf.version} | Kick`)
			.setDescription(`Please enter a reason for kicking <@${kickUser.id}>, or type \`\`cancel\`\`.`)
			.setColor(conf.embedColor)
			.setFooter(`${conf.name} ${conf.version}`)
			.setTimestamp();
		message.channel.send(embed)
		message.channel.awaitMessages(m => m.author = message.author,
			{
				max: 1,
				maxMatches: 1
			})
			.then((reason) =>
			{
				var embed = new Discord.RichEmbed()
					.setAuthor(`${conf.name} ${conf.version} | Kick`)
					.setDescription(`<@${kickUser.id}> has been kicked from the server for the following reason; \`\`${reason.content}\`\``)
					.setColor(conf.embedColor)
					.setFooter(`${conf.name} ${conf.version}`)
					.setTimestamp();
				kickUser.kick(reason.content)
					.then((promise) =>
					{
						message.channel.send(embed)
					})
					.catch((e) =>
					{
						var embed = new Discord.RichEmbed()
							.setAuthor(`${conf.name} ${conf.version} | Kick`)
							.setDescription(`<@${kickUser.id}> could not be kicked due to the following error; \`\`${e}\`\` - Make sure I have permission to kick this user.`)
							.setColor(conf.embedColor)
							.setFooter(`${conf.name} ${conf.version}`)
							.setTimestamp();
						message.channel.send(embed)
					})
			})
			.catch((e) =>
			{
				console.log(e);
			});
	}
	else if (!message.member.hasPermission("KICK_MEMBER"))
	{
		var embed = new Discord.RichEmbed()
			.setAuthor(`${conf.name} ${conf.version} | Kick`)
			.setDescription(`<@${message.author.id}>, you don't have permission to use that command!`)
			.setColor(conf.embedColor)
			.setFooter(`${conf.name} ${conf.version}`)
			.setTimestamp();
		message.channel.send(embed)
	}
}

module.exports.help =
{
    name: "kick",
    args: "[mention]",
    notes: "Kicks the mentioned user.",
    category: "Moderation"
}