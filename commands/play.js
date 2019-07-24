const Discord = require('discord.js')
const fs = require('fs');

module.exports.run = async (client, message, args) =>
{
    console.log("Test");
    message.member.voiceChannel.join().then(connection =>
    {
        console.log("Connected");
    })
    .catch(e =>
    {

    })
}

module.exports.help =
{
    name: "play",
    args: "[URL]",
    notes: "Plays the audio from a given URL in your current voice channel.",
    category: "Voice",
    roleLevel: 0,
    absoluteRoleLevel: false
}