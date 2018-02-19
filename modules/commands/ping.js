module.exports.run = async (client, message, args) =>
{
    var pingReplies = ["Pong!", "Plink Plong.", "Poooong!", "Pong Ping!", "Ping!..\n oops.", "No.", "Do you mind?", "Seriously, It's getting annoying.", "I'm gonna break the chain.", "Ponggggggggggggggggggg"];
    message.reply(`:ping_pong: ${pingReplies[Math.floor(Math.random () * pingReplies.length)]}`)
}

module.exports.help = 
{
    name: "ping",
    args: "n/a",
    notes: "A very simple ping command."
}