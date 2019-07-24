const Discord = require('discord.js')
const fs = require('fs');
const CoreOutput = require("../core/CoreOutput.js")

module.exports.run = async (client, message, args) =>
{
	let banUser = message.mentions.members.first();
    CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
    `Please enter a reason for banning <@${banUser.id}>, or type \`\`cancel\`\`.`,
    `${client.botConfig.botName} ${client.botConfig.botVersion}`, "")
    .then(() => 
    {
        message.channel.awaitMessages(m => m.author == message.author,
        {
            max: 1,
            maxMatches: 1
        })
        .then((collected) =>
        {
            if(collected.content != "cancel")
            {
                message.channel.send(collected.content)
                banUser.ban(collected.content)
                CoreOutput.Log("debug", "Banned User "+ banUser.id +" for " + collected.first().content)
                .then((promise) =>
                {
                    CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
                    `<@${banUser.id}> has been banned from the server for the following reason; \`\`${collected.first().content}\`\``,
                    `${client.botConfig.botName} ${client.botConfig.botVersion}`, "");
                })
                .catch((e) =>
                {
                    CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
                    `<@${banUser.id}> could not be banned due to the following error; \`\`${e}\`\` - Make sure I have permission to ban this user.`,
                    `${client.botConfig.botName} ${client.botConfig.botVersion}`, "");
                })
            }
            else
            {
                CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
                `<@${banUser.id}> was not banned.`,
                `${client.botConfig.botName} ${client.botConfig.botVersion}`, "");
            }
            
        });
    })
}

module.exports.help =
{
    name: "ban",
    args: "[mention]",
    notes: "Bans the mentioned user.",
    category: "Moderation",
    roleLevel: 2,
    absoluteRoleLevel: false
}