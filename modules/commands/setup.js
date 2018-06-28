module.exports.run = async (client, message, args) => {

    message.channel.send("Please send the name of the channel you wish to use for message logging. \(i.e. #logging\).");
    const filter = m => m.author = message.author;
    var response = await message.channel.awaitMessages({max: 1});
    message.channel.send(response);
    //message.channel.send("Please send the name of the channel you wish to use for message logging. \(i.e. #logging\).");
    //message.channel.awaitMessages().then(messages => {message.channel.send(messages.content)});
    //const fs = require('fs');
    //let guilds = fs.readFileSync('./modules/guilds.json');
    //let arrayOfObj = JSON.parse(guilds);
};

module.exports.help =
{
    name: 'setup',
    args: '[none]',
    notes: `Setup the bot's extended features.`,
    category: 'Misc'
}