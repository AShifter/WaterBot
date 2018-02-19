module.exports.run = async (client, message, args, bot) =>
{
    const conf = require("../config.json");
    const Discord = require("discord.js");
    const Presence = Discord.Presence;
    if (!message.author.id == conf.ownerID)
    {
        return message.reply(":no_entry_sign: Sorry, I don't think you have permission to do that.");
    }
    else
    {
        bot.user.setGame(args.join(" "));
        message.reply(`:white_check_mark: **Set my presence to \`${args.join(" ")}\`.**`);
    }
}

module.exports.help =
{
    name: 'setgame',
    args: '[gameToSet]',
    notes: 'Sets the presence (game) of the bot. (Owner Only)',
    category: "Owner Only"
}