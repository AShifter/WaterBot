const conf = require("../config.json");
module.exports.run = async (client, message, args, bot) => 
{
	String.prototype.toHHMMSS = function () { 
		let secNum = parseInt(this, 10); 
	  let hours = Math.floor(secNum / 3600); 
	  let minutes = Math.floor((secNum - (hours * 3600)) / 60); 
	  let seconds = secNum - (hours * 3600) - (minutes * 60);
	   if (hours < 10) hours = "0" + hours; 
	   if (minutes < 10) minutes = "0" + minutes;
	   if (seconds < 10) seconds = "0" + seconds;
	   let time = hours + ':' +minutes+ ':' + seconds;
	   return time;
	    }
	    let time = process.uptime();
	    let formattedTime = (time + "").toHHMMSS();
	    message.channel.send(`:clock2: ${conf.name} has been online for ${formattedTime} hours.`);
}

module.exports.help = 
{
    name: 'uptime',
    args: '[none]',
    notes: `Sends the uptime of ${conf.name}.`,
    category: 'Basic'
}