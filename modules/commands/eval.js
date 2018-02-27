module.exports.run = async (client, message, args) =>
{ 
    const conf = require('../config.json')
    const Discord = require('discord.js');
    if(message.author.id == conf.ownerID)
    {
		module.exports.error = "**:no_entry_sign: ERROR** "
		module.exports.fgRed = "\x1b[1m\x1b[31m"
		module.exports.reset = "\x1b[0m"
		try {
		const code = args.join(" ");
		const clean = text => {
		if (typeof(text) === "string")
			return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
		return text;
    }
		let evaled = eval(code);

		if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
		
		let embed = new Discord.RichEmbed()
		.setAuthor("Eval")
		.setDescription("Here's the eval result!")
		.addField(":inbox_tray: Input:", `\`\`\`js\n${code}\n\`\`\``)
		.addField(":outbox_tray: Output:", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
		.setColor(conf.embedColor)
		.setFooter(conf.name + " " + conf.version, client.user.avatarURL)
		.setTimestamp()
      message.channel.send({ embed });
		} catch(err) {
			message.channel.send(module.exports.error + err)
			console.log(module.exports.fgRed + "[X] Error caught: " + err + module.exports.reset)
		}
	} else {
		message.channel.send(module.exports.error + "Insufficient permissions.")
	}
}

module.exports.help = {
    name: "eval",
    args: "[code]",
    notes: "Executes JavaScript code.",
    category: 'Owner Only'
}