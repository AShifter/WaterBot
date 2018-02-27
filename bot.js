const client = new (require("discord.js")).Client();
client.commands = new (require("discord.js")).Collection();
require("fs").readdir("./commands/", (err, files) => {
    files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    let props = require(`./commands/${f}`);
client.commands.set(props.help.name, props)})});
    client.on('message', message => {
    let cmd = client.commands.get(message.content.split(" ")[0].slice(4));
    if (cmd && message.content.startsWith("wbm:")){cmd.run(client, message)}});
client.login("BOT_TOKEN");