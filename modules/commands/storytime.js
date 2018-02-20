module.exports.run = async (client, message, args, bot) =>
{
    
    message.guild.fetchMembers().then(guild =>
    {
        const conf = require("../config.json");
        const Discord = require('discord.js');
        const fs = require("fs");
        membersList = guild.members.array();  
        var selectedUser1 = membersList[Math.floor(Math.random() * membersList.length)].user;
        var selectedUser2 = membersList[Math.floor(Math.random() * membersList.length)].user;
        var selectedUser3 = membersList[Math.floor(Math.random() * membersList.length)].user;

            var stories = 
            [
                `One day, on a sunny afternoon, ${selectedUser1.username} decided to go outside and pick flowers. While on their flower-picking adventure, ${selectedUser2.username} got jealous. Envious of the bright, colorful flowers that ${selectedUser1.username} found, ${selectedUser2.username} stole them right out of ${selectedUser1.username}'s hand and ran away. ${selectedUser1.username} was torn. \"But ${selectedUser2.username} is my friend!\" they thought. Thankfully, it wasn't long before ${selectedUser3.username} beat the hell out of ${selectedUser2.username} with their giant ban hammer.`,
                `On a dark and scary night, ${selectedUser1.username} went to a theme park. It was here when ${selectedUser1.username} realized that he had made a horrifying mistake - He had forgotten to turn off the oven. And their cat, ${selectedUser2.username}, was still in the house! ${selectedUser1.username} raced back to their house, only after getting a triple-scoop ice cream cone, and opened the door. ${selectedUser2.username} had burnt to a crisp! It turns out the oven wasn't on though, ${selectedUser2.username} just managed to start a fire. ${selectedUser2.username} was replaced with a new cat, ${selectedUser3.username}.`,
                `${selectedUser1.username} was driving in his car when suddenly, he notice a giant disc-shaped object in the sky. He got out of the car to see what it was, when suddenly it started flying right at him at alarming speeds. Startled, ${selectedUser1.username} ran to his car - but before he could get in, a blue beam of light focuses in on him. ${selectedUser1.username} starts levitating and continues to levitate until he enters the ship that had just abducted him. After being let go of this beam of light,  ${selectedUser1.username} rubs their eyes only to see ${selectedUser2.username} standing right in front of him. \"${selectedUser2.username}! What are you doing here?\" ${selectedUser1.username} asked, happy to know that he wasn't alone. But ${selectedUser2.username} didn't respond. ${selectedUser1.username} started yelling \"${selectedUser2.username}! WHAT ARE YOU DOING?\" Then, suddenly, it went black. ${selectedUser1.username} had just become prisoner #1337 of an alien ship, forced to help abduct innocent humans just like himself.`,
                `${selectedUser1.username} was working the night shift at around 4:10 AM in the drive-through. ${selectedUser2.username} and ${selectedUser3.username} drove up. ${selectedUser1.username} said \"Hey, what can I get you?\" They asked for a three-course dinner. ${selectedUser1.username} knew what he was about to face, but he told them \"My apologies, but we're not serving three-course dinners. We're only serving breakfast at the moment.\" ${selectedUser2.username} said \"Alright, can we have a three-course dinner?\" ${selectedUser1.username} stood his ground. \"My apologies, but we're not serving three-course dinners. We're only serving breakfast at the moment.\" ${selectedUser2.username} replied \"I WANT A THREE-COURSE DINNER.\" Another Maccas employee hears this and tells ${selectedUser1.username} to take him to the drive-through window and take his order from there. Finally, a manager comes in and asks the couple what they would like to eat before they drive away laughing as they are the only ones that know that time has actually shifted and this is a parallel universe where though the moon is in the air and it's dark in the sky, it's only 5:00 PM.`
            ];
                var storySelected = [Math.floor(Math.random() * stories.length)];    
                const embed = new Discord.RichEmbed()
                .setColor(conf.embedColor)
                .setTitle(`${conf.name} ${conf.version} | Storytime`)
                .setDescription(stories[storySelected])
                .setFooter("Requested by" + message.author.tag, message.author.avatarURL)
                .setTimestamp()
                message.channel.send( { embed } );    
    })
}

module.exports.help = {
    name: 'storytime',
    args: '[none]',
    notes: 'Writes a story about random members of the server.',
    category: 'Fun'
}