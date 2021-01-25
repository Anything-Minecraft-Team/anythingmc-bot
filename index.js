const Discord = require('discord.js');

const mysql = require('mysql');

const client = new Discord.Client();

const db = require('quick.db')

client.commands = new Discord.Collection();

const config = require('./config.json');

const fs = require('fs');

const prefix = '/';

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Bot On');

    client.user.setActivity('Birdflop Hosting!');
});

var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

client.on("guildCreate", guild => {
    db.add('bot.server', 1);
})

client.on("guildDelete", guild => {
    db.subtract('bot.server', 1);

    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send('Thank you for inviting my bot! Do /help to get started!')
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    //===========================f
    //||     All Commands      ||
    //===========================

    if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord, db);
    } else if (command === 'anticheat') {
        client.commands.get('anticheat').execute(message, args, Discord, db);
    } else if (command === 'permission') {
        client.commands.get('permission').execute(message, args, Discord, db);
    } else if (command === 'serverjar') {
        client.commands.get('serverjar').execute(message, args, Discord, db);
    } else if (command === 'hosting' || command === 'hosts') {
        client.commands.get('hosting').execute(message, args, Discord, db);
    } else if (command === 'badhosting' || command === 'badhosts') {
        client.commands.get('badhosting').execute(message, args, Discord, db);
    } else if (command === 'code' || command === 'github' || command === 'repo') {
        client.commands.get('code').execute(message, args, Discord, db);
    } else if (command === 'review') {
        client.commands.get('review').execute(message, args, Discord, con, db);
    } else if (command === 'ratings') {
        client.commands.get('ratings').execute(message, args, Discord, con, client, db);
    } else if (command === 'invite') {
        client.commands.get('invite').execute(message, args, Discord, db);
    } else if (command === 'stats') {
        client.commands.get('stats').execute(message, args, Discord, db);
    }

    //===========================
    //||    Owner Commands     ||
    //===========================

    if (message.author.id === '474482013886480385') {
        if (command === 'changestatus') {
            client.commands.get('changestatus').execute(message, args, client);
        } else if (command === 'createtable') {
            client.commands.get('createtable').execute(message, args, Discord, con);
        } else if (command === 'removetable') {
            client.commands.get('removetable').execute(message, args, Discord, con);
        } else if (command === 'reviewsubmitted') {
            client.commands.get('reviewsubmitted').execute(message, args, Discord, con, client, db);
        }
    }
});

client.login(config.token);