# WaterBot
Moderation bot for the Watercolor Games Discord.

## Setup
After cloning the repo, navigate to ``/modules/config_template.json``. Open that file in a text editor of your choice. Make any changes you'd like to customize the bot - changing the Owner ID is highly recommended. After that, rename the file to ``config.json``. Rename ``example.env`` to ``.env`` using the command line. To fill in the ``token`` field, and add your token as a string.

*In ``.env``*
``token="BOT_TOKEN"``

## Running
This bot was written for Node.JS v8.9.4 LTS and assumes that you have it installed. All required packages are included, so simply navigate to the folder where ``bot.js`` is located, and run ``node bot.js`` to start it up. If configured correctly, WaterBot should state that it correctly connected to Discord.

## Writing new modules
WaterBot 2.0 is now modular - this means that you can write "modules" for it, and place them in ``/modules/commands/`` to load them automatically. Though the command loader is very much based on Precipitation.JS, it has been extremely minimized. **It is not forgiving, what-so-ever.** if you do something wrong, things WILL break and we won't tell you what did. With that out of the way, here's how you do it: 

Create a new file or drag-and-drop an existing PJS public command module into ``/modules/commands/``.
If you're creating a new file, here's a template to get you started:

```js
module.exports.run = async (client, message, args) =>
{
    // Module Code
}

module.exports.help =
{
	name: "COMMAND_NAME_HERE",
	args: "ARGS_LIST_HERE",
    notes: "COMMAND_DESCRIPTION_HERE",
    category: 'COMMAND_CATEGORY_HERE'
}
```

Simply fill out the top "section" with all of your code and the bottom with metadata. Assuming the file is in the correct directory and has no errors, it should load and should work just fine.

If you're using a PJS public command, it **should** be drag-and-drop, but may lack some WaterBot Specific features (like global embed colors) without modifiaction.

Many of the modules in WaterBot were graciously provided by Richard Moch, the only developer of the excellent PrecipitationJS Discord bot. Thanks mate! :P

I will be adding more info here soon, but for now, have fun!
