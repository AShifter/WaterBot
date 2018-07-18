const Discord = require('discord.js')
const fs = require('fs');
const conf = require("../config.json")

module.exports.run = async (client, message, args) =>
{
    let banUser = message.mentions.members.first();
    if(message.member.hasPermission("BAN_MEMBERS"))
    {
        var embed = new Discord.RichEmbed()
        .setAuthor(`${conf.name} ${conf.version} | Ban`)
        .setDescription(`Please enter a reason for banning <@${banUser.id}>.`)
        .setColor(conf.embedColor)
        .setFooter(`${conf.name} ${conf.version}`)
        .setTimestamp();
        message.channel.send(embed).then(() =>
        {
            message.channel.awaitMessages(m => m.author = message.author,{max: 1,maxMatches: 1}).then((reason) =>
            {
                message.guild.ban(banUser, reason.content).then((promise) => 
                {
                    var embed = new Discord.RichEmbed()
                        .setAuthor(`${conf.name} ${conf.version} | Ban`)
                        .setDescription(`<@${banUser.id}> has been banned from the server for the following reason; \`\`${reason.content}\`\``)
                        .setColor(conf.embedColor)
                        .setFooter(`${conf.name} ${conf.version}`)
                        .setTimestamp();
                        message.channel.send(embed)
                }).catch((e) => 
                {
                    var embed = new Discord.RichEmbed()
                        .setAuthor(`${conf.name} ${conf.version} | Ban`)
                        .setDescription(`<@${banUser.id}> could not be banned due to the following error; \`\`${e}\`\` - Make sure I have permission to ban this user.`)
                        .setColor(conf.embedColor)
                        .setFooter(`${conf.name} ${conf.version}`)
                        .setTimestamp();
                    message.channel.send(embed)
                })   
            }).catch((e) =>
            {
                console.log(e);
            })
        });
    }
    else if(!message.member.hasPermission("BAN_MEMBERS"))
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