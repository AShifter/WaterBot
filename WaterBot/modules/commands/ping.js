const conf = require("../config.json")
const Discord = require("discord.js")

module.exports.run = async (client, message, args) =>
{

    message.channel.send("Pinging...").then(msg => 
        msg.edit(`:ping_pong: **Pong!** API latency took \`\`${Math.round (msg.createdTimestamp - message.createdTimestamp)} ms\`\` to respond, and client acknowledgement took \`\`${Math.round(client.ping)} ms\`\`.`))
}

module.exports.help = {
	name: "ping",
	args: "n/a",
    notes: "Response test.",
    category: 'Misc'
}