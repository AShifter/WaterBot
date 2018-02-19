module.exports.run = async (client, fs, commands) =>
{
    fs.readdir("./modules/commands/", (err, files) =>
    {
        let modules = files.filter(f => f.split(".").pop() === "js");
        modules.forEach((f, i) => 
        {
            let props = require(`./commands/${f}`);
            try{client.commands.set(props.help.name, props)}
            catch(err){console.log('One or more of your public commands caused an error.\n=> ' + err); process.exit(1)}
        })
        console.log(`Loaded ${modules.length} public commands.`)
    });
}