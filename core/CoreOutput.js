const fs = require("fs");
const Discord = require("discord.js");
const colors = require("colors/safe")

module.exports.Log = async (status, message) =>
{
  switch(status.toLowerCase())
  {
    case "regular":
      console.log("[ ] " + message);
      break;
    case "debug":
      console.log("[" + colors.magenta("~") + "] " + message);
      break;
    case "success":
      console.log("[" + colors.green(">") + "] " + message);
      break;
    case "info":
      console.log("[" + colors.blue("i") + "] " + message);
      break;
    case "warning":
      console.log("[" + colors.yellow("!") + "] " + message);
      break;
    case "error":
      console.log("[" + colors.red("X") + "] " + message);
      break;
  }
}

module.exports.SendEmbed = async (client, channel, color, title, text, footer, thumbnail) =>
{
  var embed = new Discord.RichEmbed()
  .setAuthor(`${client.botConfig.name} ${client.botConfig.version} | ${title}`)
  .setDescription(text)
  .setFooter(footer)
  .setThumbnail(thumbnail)
  .setColor(color);

  channel.send(embed);
}