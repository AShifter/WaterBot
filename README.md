# WaterBot Mini
A ridiculous way to prove that you can write a modular Discord bot in 8 lines.

## Setup
After cloning the repo, open ``bot.js``. Open that file in a text editor of your choice. In the ``client.login("BOT_TOKEN");`` call at the bottom of the file, paste your Bot User's token, preserving the double-quotes. Make any other changes if desired, such as changing the bot's prefix.

## Running
This bot was written for Node.JS v8.9.4 LTS and assumes that you have it installed. All required packages are included, so simply navigate to the folder where ``bot.js`` is located, and run ``node bot.js`` to start it up. If configured correctly, WaterBot Mini should start working but will not give any console feedback.

## Writing new modules
WaterBot Mini is modular - this means that you can write "modules" for it, and place them in ``/commands/`` to load them automatically. Though the command loader is very much based on WaterBot 2.0, but it has been extremely minimized. **It is not forgiving, what-so-ever.** if you do something wrong, things WILL break and we won't tell you what did. *If you thought I was joking with WaterBot, just give this a try.* With that out of the way, here's how you do it: 

Create a new file or drag-and-drop an existing PJS public command module into ``/commands/``.
If you're creating a new file, here's a template to get you started:

```js
module.exports.run = async (client, message) =>
{
    // Module Code
}

module.exports.help =
{
	name: "COMMAND_NAME_HERE",
}
```

Simply fill out the top "section" with all of your code and the bottom with metadata. Assuming the file is in the correct directory and has no errors, it should load and should work just fine.

If you're using a PJS public command, it **is not** drag-and-drop. To save space, the handler does not give you args. You need to make them yourself via the message string.

Many of the modules in WaterBot (and thus Mini) were graciously provided by Richard Moch, the only developer of the excellent PrecipitationJS Discord bot. Thanks mate! :P

I will be adding more info here soon, but for now, have fun!
