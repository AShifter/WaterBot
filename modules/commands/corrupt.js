module.exports.run = async (client, message, args, bot) => {
    const Discord = require('discord.js');
    const conf = require("../config.json");
    var endString = '';
    let level = parseInt(args[0]);
    let phrase = args.slice(1).join(" ");
    if (isNaN(level)) return message.reply("Corruption cannot be NaN.");
    if (level <= 0) return message.channel.send("Corruption cannot be less than or equal to 0.");
    if (level > 500) return message.reply("Corruption cannot be greater than 500.")
    for (var i = 0; i < level; i++) {
        phrase.split();
        endString += phrase[Math.floor(Math.random() * phrase.length)];
    }

    let embed = new Discord.RichEmbed()
        .setAuthor("Corruption")
        .setDescription("Here's the corruption!")
        .addField(":inbox_tray: Input:", `\`\`\`\n${args.slice(1).join(" ")}\n\`\`\``)
        .addField(":outbox_tray: Output:", `\`\`\`\n${endString}\n\`\`\``)
        .setColor(conf.embedColor)
        .setFooter(conf.name + " " + conf.version, message.author.avatarURL)
        .setTimestamp()
    message.channel.send({ embed });
}

module.exports.help = {
    name: 'corrupt',
    args: '[level], [phrase]',
    notes: 'Corrupts a phrase.',
    category: 'Fun'
}