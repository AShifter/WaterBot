const client = new(require("discord.js")).Client();
client.cmds = new(require("discord.js")).Collection();
require("fs").readdir("./cmd/", (err, files) => {
    files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    client.cmds.set(require(`./cmd/${f}`).help.name, require(`./cmd/${f}`))})});
client.on('message', m => {if(m.content.startsWith("wbm:"))
    {client.cmds.get(m.content.split(" ")[0]).run(client, m)}});
client.login("This_is_the_same_size_as_a_discord_bot_token,_so_that's_fun");
