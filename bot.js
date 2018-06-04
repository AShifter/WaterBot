// Main definitions
const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const Loader = require("./modules/load.js");
const Events = require ("./modules/events.js");
const conf = require('./modules/config.json');
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load Commands from ./modules/commands
Loader.run(client, fs, client.commands);
 
// clientReady Event
client.on('ready', () =>
{
  console.log("Connected to Discord! Client ID: " + client.user.id);
  var randomGame = conf.presence[Math.floor(Math.random() * conf.presence.length)];
  console.log("Set Game to: " + randomGame);
  try {client.user.setActivity(randomGame)}
  catch (e){console.log(e)}
});

// messageSent Event
client.on('message', message =>
{
  if (message.content.indexOf(conf.prefix) !== 0) return;
  if (message.channel.type === "dm") return;
  Events.messageSent(client, message, conf);
});

// messageDelete Event
client.on('messageDelete', message =>
{
  if (message.cleanContent.length < 1) return;
  if (message.cleanContent.length > 1022) return;
  Events.messageDelete(client, message, conf);
});

client.login(process.env.token);