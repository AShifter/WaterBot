const dotenv = require("dotenv").config({path:"../data/.env"});
const fs = require("fs");
const Discord = require("discord.js");

module.exports.messageSent = async (client, message) =>
{
    let text = message.content;
    let args = text.split(" ").slice(1);
    let cmd = client.commands.get(text.split(" ")[0].slice(process.env.prefix.length))
    if (cmd){cmd.run(client, message, args)}
    else
    {
      message.reply(`:no_entry_sign: That command doesn't exist. To get a list of commands, type \`${process.env.prefix}help.\``);
    }
}


module.exports.messageDelete = async (client, message) =>
{
    if (message.content.startsWith("wbf:")) return;
    if (message.cleanContent.length < 1) return;
    if (message.cleanContent.length > 1022) return;
    let channel;
    fs.readFile('../data/guilds.json', function (err, content) {
        if (err) console.log(err);
        let arrayOfObjects = JSON.parse(content);
        if (message.channel.id == arrayOfObjects.guilds[message.guild.id].chatLogChannel) return;
        if (!arrayOfObjects.guilds[message.guild.id] || arrayOfObjects.guilds[message.guild.id].chatLogChannel == undefined) return;
        var channel;
        if (client.channels.has(arrayOfObjects.guilds[message.guild.id].chatLogChannel)) {
            channel = client.channels.get(arrayOfObjects.guilds[message.guild.id].chatLogChannel);
        } else {
            return;
        }
        if (channel != null) {
            var e = new Discord.RichEmbed()
                .setTitle(':wastebasket: Message Deleted')
                .setDescription(" **A message was deleted by " + message.author.username + " in ** <#" + message.channel.id + ">.")
                .setColor(process.env.embedColor)

            if (message.cleanContent.length) {
                e.addField('Message Content:', message.cleanContent);
            }

            if (message.attachments.size > 0) {
                for (let [key, attachment] of message.attachments) {
                    if (attachment.height == null) {
                        e.addField('\r\n\r\nThe following attachments were found in this message:', attachment.filename + " @ " + parseInt(attachment.filesize) + " bytes long.");
                    } else {
                        e.addField('\r\n\r\nThe following attachments were found in this message:', attachment.proxyURL);
                    }
                }
            }
            channel.send({ embed: e });
        }
    });
}

module.exports.guildCreate = async (client, guild) =>
{
    try {client.user.setActivity(`on ${client.guilds.size} servers`)}
    catch (e){console.log(e)}
    console.log(`Joined Guild ${guild.name}, ${guild.id}`)
    fs.readFile('../data/guilds.json', function (err, content)
    {
        if (err) console.log(err);
            let arrayOfObjects = JSON.parse(content);
            if (arrayOfObjects.guilds[guild.id] == null) {
                guild.channels.find(c => c.name == 'general').send(
                new Discord.RichEmbed()
                .setTitle(`Welcome to ${process.env.name}!`)
                .setDescription(`Hello! I'm ${process.env.name}, a Discord moderation bot. Before you can use extended features like message logging, you will have to run setup. To do so, run \`\`${process.env.prefix}setup\`\`. Only \<\@${guild.owner.id}\> or someone with \`\`Administrator\`\` permissions may run this command. If you run setup, we will automatically cache your guild. This will allow me to log all deleted and edited messages on your server, as well as user information. Sensitive information will not leave this server. If you do not agree with these terms, this bot will leave the server.`)
                .setColor(process.env.embedColor)
                .setFooter(`${process.env.name} ${process.env.version}`)
                .setTimestamp()
            );
        }
    });

    module.exports.guildDelete = async (guild) => 
    {
        try {client.user.setActivity(`on ${client.guilds.size} servers`)}
        catch (e){console.log(e)}
        console.log(`Left Guild ${guild.name}, ${guild.id}`)
    }
}