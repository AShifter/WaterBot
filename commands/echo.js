module.exports.run = async (client, message) =>
{
    message.delete();
    message.channel.send(message.content.substr(9, message.content.length));
}

module.exports.help = {
    name: "echo"
}