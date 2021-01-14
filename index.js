const Discord = require('discord.js');

const client = new Discord.Client();

var db = require('quick.db')

client.commands = new Discord.Collection();

const config = require('./config.json');

const fs = require('fs');

const prefix = '!';

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Bot On');

    client.user.setActivity('Server Yes');
});

client.on("guildCreate", guild => {
    db.add('bot.server', 1);
})

client.on("guildDelete", guild => {
    db.subtract('bot.server', 1);
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    //===========================
    //||     All Commands      ||
    //===========================

    //test command
    if(command === 'help'){
        client.commands.get('help').execute(message, args, Discord);
    } else if(command === 'anticheat'){
        client.commands.get('anticheat').execute(message, args, Discord);
    } else if(command === 'permission'){
        client.commands.get('permission').execute(message, args, Discord);
    } else if(command === 'serverjar'){
        client.commands.get('serverjar').execute(message, args, Discord);
    } else if(command === 'hosting'){
        client.commands.get('hosting').execute(message, args, Discord);
    } else if(command === 'badhosting'){
        client.commands.get('badhosting').execute(message, args, Discord);
    } else if(command === 'code'){
        client.commands.get('code').execute(message, args, Discord);
    } else if(command === 'compare'){
        client.commands.get('compare').execute(message, args, Discord);
    }
});


client.login(config.token);