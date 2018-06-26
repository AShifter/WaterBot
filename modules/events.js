module.exports.messageSent = async (client, message, conf) =>
{
    let text = message.content;
    let args = text.split(" ").slice(1);
    let cmd = client.commands.get(text.split(" ")[0].slice(conf.prefix.length))
    if (cmd){cmd.run(client, message, args)}
    else
    {
      message.reply(`:no_entry_sign: That command doesn't exist. To get a list of commands, type \`${conf.prefix}help.\``);
    }
}


module.exports.messageDelete = async (client, message, conf) =>
{
    // TBI
}
