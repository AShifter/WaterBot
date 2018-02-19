module.exports.run = async (client, message, args, bot) =>
{
    var pingReplies = ["Pong!", "Plink Plong.", "Poooong!", "Pong Ping!", "Ping!..\n oops.", "No.", "Do you mind?", "Seriously, It's getting annoying.", "I'm gonna break the chain.", "Ponggggggggggggggggggg"];
    message.channel.send(`:ping_pong: ${pingReplies[Math.floor(Math.random () * pingReplies.length)]}`)
}

module.exports.help = {
	name: "ping",
	args: "n/a",
    notes: "Response test.",
    category: 'Misc'
}