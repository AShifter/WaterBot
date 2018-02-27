module.exports.run = async (client, message) => {
    let array = message.content.split(" ");
    let args = array.slice(1);
    const Discord = require('discord.js');
    function replaceAll(search, placement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement)
    }
    
    try {
        let embed = new Discord.RichEmbed()
            .setTitle(`LMGTFY - ${args.join(" ")}`)
            .setDescription(`http://www.lmgtfy.com/?s=g&iie=0&q=${args.join("+")}`)
            .setFooter(`WaterBot Mini 0.9`)
            .setTimestamp()
            .setColor("ORANGE")
        message.channel.send({ embed });
    } catch (e) {
        throwex(e);
    }
}
module.exports.help = {
    name: 'lmgtfy',
}