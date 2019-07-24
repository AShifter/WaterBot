const Discord = require("discord.js");

module.exports.getPermissionLevel = async (member, callback) =>
{
  var permLevels = [];
  if(member.hasPermission("ADMINISTRATOR"))
  {
    permLevels.push(3)
  }

  if(
    member.hasPermission("KICK_MEMBERS") &&
    member.hasPermission("BAN_MEMBERS") &&
    member.hasPermission("MANAGE_NICKNAMES") &&
    member.hasPermission("MANAGE_CHANNELS") &&
    member.hasPermission("MANAGE_MESSAGES"))
  {
    permLevels.push(2)
  }

  if(member.roles.array().length > 1)
  {
    permLevels.push(1)
  }

  if(member.roles.array().length = 1)
  {
    permLevels.push(0)
  }
  callback(permLevels[0])
}
