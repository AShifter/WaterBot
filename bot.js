// Main definitions
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var conf = JSON.parse(fs.readFileSync("./config/config.json"));
const client = new Discord.Client();

// Setup
bot.on('ready', () =>
{
	// When bot is connected to Discord
 console.log("Connected to Discord! Client ID: " + bot.user.id);
});

// Listen for messages
bot.on('message', message =>
{
 // Ignore itself and other bots
 if (message.author.bot) return;
 // Ignore messages that do not start with prefix
 if (message.content.indexOf(conf.prefix) !== 0) return;
 // Setup Args
 const args = message.content.slice(conf.prefix.length).trim().split(/ +/g);
 // Create Command variable
 const command = args.shift().toLowerCase();

 // Help Command
 if (command == "help")
 {
   message.channel.send({embed: {
    color: 3447003,
    title: conf.name + " Help",
    description: "For more information about a specific command, use ``" + conf.prefix + "help [command]``",
    fields: [{
        name: "Fun",
        value: conf.prefix + "ping\n",
        inline: true
      },
      {
        name: "Misc",
        value: conf.prefix + "help\n" + conf.prefix + "uptime\n",
        inline: true
      },
      {
        name: "Staff",
        value: conf.prefix + "rm\n",
        inline: true
      },
      {
          name: "Bot Owner",
          value: conf.prefix + "setgame\n",
        }
    ],
  }
});
 }
 // inline=true
 // Ping Command
 if (command == "ping")
 {
	 message.channel.send(conf.pingResponses[Math.floor(Math.random() * conf.pingResponses.length)]);
 }

 // RM Command
 if (command == "rm")
 {
	 if (message.member.hasPermission("MANAGE_MESSAGES"))
	 {
		 message.delete();
		 const deleteCount = parseInt(args[0], 10);
		 if (!deleteCount || deleteCount < 2 || deleteCount > 100)
		 {
			 message.channel.send(":no_entry_sign: Cannot delete \"" + args[0] + "\" messages. Please enter a value between 1 and 100.");

		 }
		 else
		 {
			 message.channel.fetchMessages(
			 {
				 limit: deleteCount
			 }).then(messages => message.channel.bulkDelete(messages));
			 message.channel.send(":white_check_mark: Deleted " + deleteCount + " messages.");
			 console.log(message.author.tag + " Deleted " + args[0] + " messages from #" + message.channel.name + " (" + message.channel.id + ")");
		 }
	 }
	 else
	 {
		 message.channel.send(":no_entry_sign: You don't have permission to run this command!");
	 }
 }

 // No Command
 if(command == "")
 {
   message.channel.send(":no_entry_sign: Sorry kid, that ain't a valid command.");
 }

 // SetGame Command
 if(command == "setgame")
 {
   if(message.author.id == conf.ownerID)
   {
    bot.user.setPresence({ game: { name: args.join(" "), type: 0 } });
     message.channel.send(":white_check_mark: Set game to \"" + args.join(" ") + "\".");
     console.log("Set game to \"" + args.join(" ") + "\"");
   }
   else
   {
     message.channel.send(":no_entry_sign: <@" + message.author.id + "> I don't think you own me...")
   }
 }

    // uinfo Command
    if(command == "uinfo")
    {
      message.channel.send({embed: {
       color: 3447003,
       title: "User Info",
       description: "is someone doing a thing? get some info!",
     }
   });
    }
    // Uptime Command
    if(command == "uptime")
    {
      message.channel.send({embed: {
  color: 3447003,
  title: conf.name + " Uptime",
  description: conf.name + " has been online for " + Math.round(((process.uptime() / 60) * 10^1) / 10^1) + "m."
      }});
    }
});
bot.login(conf.token);
