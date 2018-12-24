const Discord = require('discord.js')
const fs = require('fs');
const CoreOutput = require("../core/CoreOutput.js")

module.exports.run = async (client, message, args) =>
{
	let banUser = message.mentions.members.first();
	if (message.member.hasPermission("BAN_MEMBERS"))
	{
        CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
        `Please enter a reason for banning <@${banUser.id}>, or type \`\`cancel\`\`.`,
        `${client.botConfig.name} ${client.botConfig.version}`, "").then(() =>
        {
            message.channel.awaitMessages(m => m.author = message.author,
                {
                    max: 1,
                    maxMatches: 1
                })
                .then((collected) =>
                {
                    //banUser.ban(collected.content)
                    message.channel.send("banne TIem" + collected.content)
                        .then((promise) =>
                        {
                            CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
                            `<@${banUser.id}> has been banned from the server for the following reason; \`\`${collected.content}\`\``,
                            `${client.botConfig.name} ${client.botConfig.version}`, "");
                        })
                        .catch((e) =>
                        {
                            CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
                            `<@${banUser.id}> could not be banned due to the following error; \`\`${e}\`\` - Make sure I have permission to kick this user.`,
                            `${client.botConfig.name} ${client.botConfig.version}`, "");
                        })
                });
        })

	}
	else if (!message.member.hasPermission("BAN_MEMBER"))
	{
        CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Ban",
        `<@${message.author.id}>, you don't have permission to use that command!`,
        `${client.botConfig.name} ${client.botConfig.version}`, "");
	}
}

module.exports.help =
{
    name: "ban",
    args: "[mention]",
    notes: "Bans the mentioned user.",
    category: "Moderation"
}