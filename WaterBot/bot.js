// Main definitions
const dotenv = require("dotenv").config({path:"./modules/.env"});
const Discord = require("discord.js");
const Events = require ("./modules/services/events.js");
const conf = require('./modules/config.json');
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load Commands from ./modules/commands
fs.readdir("./modules/commands/", (err, files) =>
{
    let modules = files.filter(f => f.split(".").pop() === "js");
    modules.forEach((f, i) => 
    {
        let props = require(`./modules/commands/${f}`);
        try{client.commands.set(props.help.name, props)}
        catch(err){console.log('One or more of your modules caused an error.\n=> ' + err); process.exit(1)}
    })
    console.log(`Loaded ${modules.length} modules.`)
});
 
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

client.on('guildCreate', guild =>
{
  Events.guildCreate(guild);
});

client.login(process.env.token);