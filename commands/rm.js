const Discord = require('discord.js')
const fs = require('fs');

module.exports.run = async (client, message, args) =>
{
    if(message.member.hasPermission("DELETE_MESSAGES"))
    {
        if(args[0] < 0 || args[0] > 99)
        {
            var embed = new Discord.RichEmbed()
            .setAuthor(`${conf.name} ${conf.version} | Purge`)
            .setDescription(`Could not purge messages - please enter a number between 1 and 100.`)
            .setColor(conf.embedColor)
            .setFooter(`${conf.name} ${conf.version}`)
            .setTimestamp();
            message.channel.send(embed)
        }else if(args[0] <= 99 && args[0] > 0)
        {
            message.channel.bulkDelete(args[0] + 1).then((promise) => 
            {
                var embed = new Discord.RichEmbed()
                .setAuthor(`${conf.name} ${conf.version} | Purge`)
                .setDescription(`Successfully purged ${args[0]} messages.`)
                .setColor(conf.embedColor)
                .setFooter(`${conf.name} ${conf.version}`)
                .setTimestamp();
                message.channel.send(embed)
            }).catch((e) => 
            {
                var embed = new Discord.RichEmbed()
                .setAuthor(`${conf.name} ${conf.version} | Purge`)
                .setDescription(`Could not purge messages due to the following error; \`\`${e}\`\` - Make sure I have permission to delete messages in this channel.`)
                .setColor(conf.embedColor)
                .setFooter(`${conf.name} ${conf.version}`)
                .setTimestamp();
                message.channel.send(embed)
            })
        }
        
    }
    else if(!message.member.hasPermission("DELETE_MESSAGES"))
    {
        var embed = new Discord.RichEmbed()
        .setAuthor(`${conf.name} ${conf.version} | Purge`)
        .setDescription(`<@${message.author.id}>, you don't have permission to use that command!`)
        .setColor(conf.embedColor)
        .setFooter(`${conf.name} ${conf.version}`)
        .setTimestamp();
		message.channel.send(embed)
    }
}

module.exports.help =
{
    name: "rm",
    args: "[number]",
    notes: "Removes a given amount of messages, up to 99 at a time.",
    category: "Moderation"
}