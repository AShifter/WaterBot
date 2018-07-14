const Discord = require('discord.js')
const fs = require('fs');
const conf = require("../config.json")

module.exports.run = async (client, message, args) =>
{
    if(message.member.hasPermission("BAN_MEMBERS") && client.user.member.hasPermission("BAN_MEMBERS"))
    {
        let banUser = message.mentions.members.first();

        var embed = new Discord.RichEmbed()
        .setAuthor(`${conf.name} ${conf.version} | Ban`)
        .setDescription(`Please enter a reason for banning <@${banUser.id}>.`)
        .setColor(conf.embedColor)
        .setFooter(`${conf.name} ${conf.version}`)
        .setTimestamp();
		message.channel.send(embed).then(() =>
		{
			message.channel.awaitMessages(m => m.author = message.author,{max: 1,maxMatches: 1}).then((collected) =>
			{
                banUser.ban(collected.content);
                var embed = new Discord.RichEmbed()
                .setAuthor(`${conf.name} ${conf.version} | Ban`)
                .setDescription(`<@${banUser.id}> has been banned from the server for the following reason;\n\`\`${collected.content}\`\``)
                .setColor(conf.embedColor)
                .setFooter(`${conf.name} ${conf.version}`)
                .setTimestamp();
                message.channel.send(embed)
			}).catch((e) =>
			{
				console.log(e)
            })
        });
    }
    else if(!message.member.hasPermission("BAN_MEMBERS") && !client.user.hasPermission("BAN_MEMBERS"))
    {
        var embed = new Discord.RichEmbed()
        .setAuthor(`${conf.name} ${conf.version} | Ban`)
        .setDescription(`<@${message.author.id}>, you don't have permission to use that command!`)
        .setColor(conf.embedColor)
        .setFooter(`${conf.name} ${conf.version}`)
        .setTimestamp();
		message.channel.send(embed)
    }
}

module.exports.help =
{
    name: "ban",
    args: "[mention]",
    notes: "Bans the mentioned user.",
    category: "Moderation"
}