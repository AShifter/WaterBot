module.exports.run = async (client, message, args, bot) => {
    var fact = ['A broken clock is right two times every day.', 'It would take a sloth one month to travel one mile.','The world’s oldest piece of chewing gum is over 9,000 years old.', 'A sneeze travels about 100 miles per hour.', 'Earth has traveled more than 5,000 miles in the past 5 minutes.', 'Banging your head against a wall burns 150 calories an hour.', '95% of people text things they could never say in person.','A mole can dig a tunnel that is 300 feet long in only one night.','Chewing gum while you cut an onion will help keep you from crying.', 'A hippo’s wide open mouth is big enough to fit a 4-foot-tall child in.','It is physically impossible for pigs to look up into the sky.','A crocodile can’t poke its tongue out.', 'A coyote can hear a mouse moving underneath a foot of snow.', 'Bolts of lightning can shoot out of an erupting volcano.','10% of the World’s population is left handed.','July, August, September, October and November Spell Jason.'];
    message.reply(fact[Math.floor(Math.random() * fact.length)]);
}
module.exports.help = {
   name: 'funfact',
   args: 'n/a',
   notes: 'Gives you a fun fact.',
   category: 'Fun'
}