const Discord = require("discord.js")
const permissions = require("../core/permissions.js")
const CoreOutput = require("../core/CoreOutput.js")

module.exports.run = async (client, message, args) =>
{
  let testUser = message.mentions.members.first();
  if(testUser == null)
  {
    testUser = message.member;
  }
  permissions.getPermissionLevel(testUser, function(data)
  {
    message.channel.send(`The permission level of \`\`${testUser.user.tag}\`\` is \`\`${data}\`\`.`);
    CoreOutput.Log("debug", `The permission level of ${testUser.user.tag} is ${data}.`);
    return;
  })
}

module.exports.help = {
	name: "perm",
	args: "[ping]",
    notes: "Get the permission level of a certain user.",
    category: 'Misc'
}
