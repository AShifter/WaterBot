module.exports.run = async (client, message, args, bot) => {
    let command;
    if (client.commands.has(args[0])) {
        command = args[0];
    }
    if (!command) return message.channel.send(`The module \`${args[0]}\` could not be found.`)
    try {
        delete require.cache[require.resolve(`./${command}`)];
        let cmd = require(`./${command}`);
        client.commands.delete(command);
        client.commands.set(command, cmd);
        if(command == "reload")
        {
            message.reply(":white_check_mark: yo dawg, i heard you liked reloading so i reloaded your reload so you can reload while you reload");
        }else
        {
            message.reply(`:white_check_mark: **The ${command} command has been reloaded!**`)
        }
    } catch (e) {
        message.channel.send('An error has occured while reloading this module. This error has been logged to the console.');
        console.log(e);
    }
}
module.exports.help = 
{
    name: "reload",
    args: "[./filename.js]",
    notes: "Restarts a specified command.",
    category: "Utility"
}