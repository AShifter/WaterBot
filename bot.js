// Main definitions
const Discord = require("discord.js");
const Loader = require("./modules/load.js");
const conf = require('./modules/config.json');
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load Commands from ./modules/commands
Loader.run(client, fs, client.commands);
 
// When bot starts
client.on('ready', () =>
{
  console.log("Connected to Discord! Client ID: " + client.user.id);
  var randomGame = conf.presence[Math.floor(Math.random() * conf.presence.length)];
  console.log("Set Game to: " + randomGame);
  try {client.user.setActivity(randomGame)}
  catch (e){console.log(e)}
});

// Message handler
client.on('message', message =>
{
  //if (message.author.client) return;
  if (message.channel.type === "dm") return;
  if (message.content.indexOf(conf.prefix) !== 0) return;
  let array = message.content.split(" ");
  let command = array[0];
  let args = array.slice(1);
  let cmd = client.commands.get(command.slice(conf.prefix.length))
  if (cmd){cmd.run(client, message, args)}
  else
  {
    message.reply(`:no_entry_sign: That command doesn't exist. To get a list of commands, type \`${conf.prefix}help.\``);
  }
});
client.login(conf.token);