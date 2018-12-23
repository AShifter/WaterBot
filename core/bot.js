// Main definitions
const dotenv = require("dotenv").config({path:"../data/.env"});
var conf = process.env
const Discord = require("discord.js");
const events = require ("./events.js");
const fs = require("fs");
const CoreOutput = require("./CoreOutput.js")
const os = require("os")
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load Commands from ./modules/commands
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
  var mem = os.totalmem() / 1048576;
  var memfree = os.freemem() / 1048576;
  CoreOutput.Log("info", `Running on ${os.type} ${os.arch} and NodeJS ${process.version}`)
  CoreOutput.Log("info", `${os.cpus()[1].model}, ${Math.round(mem)}MB RAM (${Math.round(memfree)}MB free)`)
  CoreOutput.Log("success", "Connected to Discord. Client ID: " + client.user.id)
  client.user.setPresence({ status: 'online', game: { name: `on ${client.guilds.size} servers` } });
  CoreOutput.Log("info", `Set Game to: (Playing) on ${client.guilds.size} servers`);
});

// messageSent Event
client.on('message', message =>
{
  if (message.content.indexOf(conf.prefix) !== 0) return;
  if (message.channel.type === "dm") return;
  events.messageSent(client, message, conf);
});

// messageDelete Event
client.on('messageDelete', message =>
{
  if (message.cleanContent.length < 1) return;
  if (message.cleanContent.length > 1022) return;
  events.messageDelete(client, message, conf);
});

// guildCreate Event
client.on('guildCreate', guild =>
{
  events.guildCreate(client, guild);
});

// guildDelete Event
client.on('guildDelete', guild =>
{
  events.guildCreate(guild);
});

client.login(process.env.token);