module.exports.run = async (client, message, args, bot) =>
{
    const conf = require('../config.json');
    const Discord = require('discord.js');
    let pinged = message.guild.member(message.mentions.users.first());
    try 
    {
        if (pinged == null) 
        {
            var embed = new Discord.RichEmbed()
                .setColor(conf.embedColor)
                .setThumbnail(message.author.avatarURL)
                .setTitle(`Information about ${message.author.username}:`)
                .addField("Account Information ", `**Username:** ${message.author.username}\r\n**User Discriminator:** #${message.author.discriminator}\r\n**User ID:** ${message.author.id}`)
                .addField("Dates", `Creation Date: ${message.author.createdAt}\r\nJoined Date: ${message.member.joinedAt}`)
                .setFooter("Requested by" + message.author.tag, message.author.avatarURL)
                .setTimestamp()
            message.channel.send({ embed })
        }
        else
        {
            var embed = new Discord.RichEmbed()
                .setColor(conf.embedColor)
                .setThumbnail(pinged.user.avatarURL)
                .setTitle(`Information about ${pinged.user.username}:`)
                .addField("Account Information ", `**Username:** ${pinged.user.username}\r\n**User Discriminator:** ${pinged.user.discriminator}\r\nUser ID: ${pinged.user.id}`)
                .addField("Dates", `Creation Date: ${pinged.user.createdAt}\r\nJoined Date: ${pinged.joinedAt}`)
                .setFooter("Requested by " + message.author.tag, message.author.avatarURL)
                .setTimestamp()
            message.channel.send({ embed })
        }
    } 
     catch (e) {console.log(e)}
}
module.exports.help = {
    name: 'uinfo',
    args: '[pinged] (Optional)',
    notes: 'Provides a basic set of information about a specfic user.',
    category: 'Information'
}