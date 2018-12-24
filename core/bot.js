// Main definitions
const dotenv = require("dotenv").config({path:"../data/.env"});
const Discord = require("discord.js");
const events = require ("./events.js");
const CoreOutput = require("./CoreOutput.js")
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.botConfig = require("../data/config.json")

// Load Commands from ../commands
fs.readdir("../commands/", (err, files) =>
{
    let modules = files.filter(f => f.split(".").pop() === "js");
    modules.forEach((f, i) =>
    {
        let props = require(`../commands/${f}`);
        try{client.commands.set(props.help.name, props)}
        catch(err){CoreOutput.Log("error", "One or more of your modules caused an error.\n=> " + err); process.exit(1)}
    })
    CoreOutput.Log("success", `Loaded ${modules.length} modules.`)
});

// clientReady Event
client.on('ready', () =>
{
  CoreOutput.Log("success", "Connected to Discord. Client ID: " + client.user.id)
  client.user.setPresence({ status: 'online', game: { name: `on ${client.guilds.size} servers` } });
  CoreOutput.Log("info", `Set Game to: (Playing) on ${client.guilds.size} servers`);
});

// messageSent Event
client.on('message', message =>
{
  if (message.content.indexOf(client.botConfig.prefix) !== 0) return;
  if (message.channel.type === "dm") return;
  events.messageSent(client, message, client.botConfig);
});

// messageDelete Event
client.on('messageDelete', message =>
{
  if (message.cleanContent.length < 1) return;
  if (message.cleanContent.length > 1022) return;
  events.messageDelete(client, message, client.botConfig);
});

// guildCreate Event
client.on('guildCreate', guild =>
{
  events.guildCreate(client, guild);
});

// guildDelete Event
client.on('guildDelete', guild =>
{
  events.guildDelete(guild);
});

client.login(process.env.token);