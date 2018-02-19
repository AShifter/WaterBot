// Main definitions
const Discord = require("discord.js");
const Loader = require("./modules/load.js");
const fs = require("fs");
const bot = new Discord.Client();
const client = new Discord.Client();
const conf = require('./modules/config.json');
client.commands = new Discord.Collection();

// Load Commands from ./modules/commands
Loader.run(client, fs, client.commands);

// When bot starts
bot.on('ready', () =>
{
  console.log("Connected to Discord! Client ID: " + bot.user.id);
});

// Message handler
bot.on('message', message =>
{
  // Ignore redundant messages
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.content.indexOf(conf.prefix) !== 0) return;
  // Split message to get command and args
  let array = message.content.split(" ");
  let command = array[0];
  let args = array.slice(1);
  // Pass command to correct module
  let cmd = client.commands.get(command.slice(conf.prefix.length))
  if (cmd){cmd.run(client, message, args, bot)}
  else
  {
    message.reply(`:no_entry_sign: That command doesn't exist. To get a list of commands, type \`${conf.prefix}help.\``);
  }
});
bot.login(conf.token);