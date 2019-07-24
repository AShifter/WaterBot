// Main definitions
const dotenv = require("dotenv").config({path: "../data/.env"});
const Discord = require("discord.js");
const CoreOutput = require("./CoreOutput.js");
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
		    try
		    {
			      client.commands.set(props.help.name, props)
		    }
		    catch (err)
		    {
			      CoreOutput.Log("error", "One or more of your modules caused an error.\n=> " + err);
			      process.exit(1)
		    }
	  })
	  CoreOutput.Log("success", `Loaded ${modules.length} modules.`)
});

// clientReady Event
client.on('ready', () =>
{
	  CoreOutput.Log("success", "Connected to Discord. Client ID: " + client.user.id)
	  client.user.setPresence(
	  {
		    status: 'online',
		    game:
		    {
			      name: `on ${client.guilds.size} servers`
		    }
	  });
	  CoreOutput.Log("info", `Set Game to: (Playing) on ${client.guilds.size} servers`);
});

// messageSent Event
client.on('message', message =>
{
	  if (message.content.indexOf(client.botConfig.botPrefix) !== 0) return;
	  if (message.channel.type === "dm") return;
	  let text = message.content;
	  let args = text.split(" ").slice(1);
	  let cmd = client.commands.get(text.split(" ")[0].slice(client.botConfig.botPrefix.length))
	  permissions.getPermissionLevel(message.member, function(perms)
	  {
		    if (perms < cmd.roleLevel)
		    {
			      CoreOutput.SendEmbed(client, message.channel, client.botConfig.embedColor, "Error", `<@${message.author.id}>, you don't have permission to use that command!`, `${client.botConfig.name} ${client.botConfig.version}`, "");
			      return;
		    }
		    else
		    {
			      if (cmd)
			      {
				        cmd.run(client, message, args)
			      }
			      else
			      {
				        message.reply(`:no_entry_sign: That command doesn't exist. To get a list of commands, type \`${client.botConfig.botPrefix}help.\``);
			      }
		    }
	  });
});

// messageDelete Event
client.on('messageDelete', message =>
{
	if (message.cleanContent.length < 1) return;
	if (message.cleanContent.length > 1022) return;
	if (message.content.startsWith("wbf:")) return;
	if (message.cleanContent.length < 1) return;
	if (message.cleanContent.length > 1022) return;
	let channel;
	fs.readFile('../data/guilds.json', function(err, content)
	{
		if (err) console.log(err);
		let arrayOfObjects = JSON.parse(content);
		if (message.channel.id == arrayOfObjects.guilds[message.guild.id].chatLogChannel) return;
		if (!arrayOfObjects.guilds[message.guild.id] || arrayOfObjects.guilds[message.guild.id].chatLogChannel == undefined) return;
		var channel;
		if (client.channels.has(arrayOfObjects.guilds[message.guild.id].chatLogChannel))
		{
			channel = client.channels.get(arrayOfObjects.guilds[message.guild.id].chatLogChannel);
		}
		else
		{
			return;
		}
		if (channel != null)
		{
			var e = new Discord.RichEmbed()
				.setTitle(':wastebasket: Message Deleted')
				.setDescription(" **A message was deleted by " + message.author.username + " in ** <#" + message.channel.id + ">.")
				.setColor(client.botConfig.embedColor)
			if (message.cleanContent.length)
			{
				e.addField('Message Content:', message.cleanContent);
			}
			if (message.attachments.size > 0)
			{
				for (let [key, attachment] of message.attachments)
				{
					if (attachment.height == null)
					{
						e.addField('\r\n\r\nThe following attachments were found in this message:', attachment.filename + " @ " + parseInt(attachment.filesize) + " bytes long.");
					}
					else
					{
						e.addField('\r\n\r\nThe following attachments were found in this message:', attachment.proxyURL);
					}
				}
			}
			channel.send(
			{
				embed: e
			});
		}
	});
});

// guildCreate Event
client.on('guildCreate', guild =>
{
	try
	{
		client.user.setActivity(`on ${client.guilds.size} servers`)
	}
	catch (e)
	{
		console.log(e)
	}
	console.log(`Joined Guild ${guild.name}, ${guild.id}`)
	fs.readFile('../data/guilds.json', function(err, content)
	{
		if (err) console.log(err);
		let arrayOfObjects = JSON.parse(content);
		if (arrayOfObjects.guilds[guild.id] == null)
		{
			guild.channels.find(c => c.name == 'general')
				.send(new Discord.RichEmbed()
					.setTitle(`Welcome to ${client.botConfig.name}!`)
					.setDescription(`Hello! I'm ${client.botConfig.name}, a Discord moderation bot. Before you can use extended features like message logging, you will have to run setup. To do so, run \`\`${client.botConfig.prefix}setup\`\`. Only \<\@${guild.owner.id}\> or someone with \`\`Administrator\`\` permissions may run this command. If you run setup, we will automatically cache your guild. This will allow me to log all deleted and edited messages on your server, as well as user information. Sensitive information will not leave this server. If you do not agree with these terms, this bot will leave the server.`)
					.setColor(client.botConfig.embedColor)
					.setFooter(`${client.botConfig.name} ${client.botConfig.version}`)
					.setTimestamp());
		}
	});
});

// guildDelete Event
client.on('guildDelete', guild =>
{
    try
	  {
		    client.user.setActivity(`on ${client.guilds.size} servers`)
	  }
	  catch (e)
	  {
		    console.log(e)
	  }
	  console.log(`Left Guild ${guild.name}, ${guild.id}`)
});

client.login(process.env.token);