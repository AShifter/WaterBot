const Discord = require('discord.js')
const fs = require('fs');
const CoreOutput = require("../core/CoreOutput.js")

module.exports.run = async (client, message, args) =>
{
	let kickUser = message.mentions.members.first();
	if (message.member.hasPermission("KICK_MEMBERS"))
	{
        CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Kick",
        `Please enter a reason for kicking <@${kickUser.id}>, or type \`\`cancel\`\`.`,
        `${client.botConfig.botName} ${client.botConfig.botVersion}`, "")
        .then(() => {
            message.channel.awaitMessages(m => m.author == message.author,
            {
                max: 1,
                maxMatches: 1
            })
            .then((collected) =>
            {
            kickUser.kick(collected.content)
            CoreOutput.Log("debug", "Kicked User "+ kickUser.id +" for " + collected.first().content)
            .then((promise) =>
            {
                CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Kick",
                `<@${kickUser.id}> has been kicked from the server for the following reason; \`\`${collected.first().content}\`\``,
                `${client.botConfig.botName} ${client.botConfig.botVersion}`, "");
            })
            .catch((e) =>
            {
                CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Kick",
                `<@${kickUser.id}> could not be kicked due to the following error; \`\`${e}\`\` - Make sure I have permission to kick this user.`,
                `${client.botConfig.botName} ${client.botConfig.botVersion}`, "");
            })
        });
    })}
	else if (!message.member.hasPermission("KICK_MEMBER"))
	{
        CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Kick",
        `<@${message.author.id}>, you don't have permission to use that command!`,
        `${client.botConfig.name} ${client.botConfig.version}`, "");
	}
}

module.exports.help =
{
    name: "kick",
    args: "[mention]",
    notes: "Kicks the mentioned user.",
    category: "Moderation"
}