const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');

const request = require('request');
const cheerio = require('cheerio');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Ready To Bake A Cake!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        client.commands.get('help').execute(message, args);  
    } else if (command == 'infinitekraft'){
        client.commands.get('infinitekraft').execute(message, args);
    } else if (command == 'kingb'){
        client.commands.get('kingb').execute(message, args);
    } else if (command == 'skyblock'){
        client.commands.get('skyblock').execute(message, args);
    } else if (command == 'skycrypt'){
        client.commands.get('skycrypt').execute(message, args);
    } else if (command == 'hyauctions'){
        client.commands.get('hyauctions').execute(message, args);
     }
});

if (msg.startsWith(prefix + ' ')){
    let results = ' ';
    image(message, results);
}

function image (message, results) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + results,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent":"Chrome"
        }
    };
    request(options, function (error, response, responseBody){
        if (error){
            return console.log('An error has occurred.')
        }//if there is an error.
        $ = cheerio.load(responseBody);
        var links = $(".image a. link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'));
        if (!urls.length){
            return console.log('No results found. ')
        }//See if there are any results
        const embed = new Discord.MessageEmbed()
        .setTitle(results)
        .setImage(urls[Math.floor(Math.random() * urls.length)])
        .setFooter('Searched by ' + message.author.username)
        .setColor('#880e0e')
        message.channel.send(embed);
    })
}

client.login('ENTER CODE HERE');
