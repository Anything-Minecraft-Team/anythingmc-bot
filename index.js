// dependecies

const Discord = require('discord.js');
const mysql = require('mysql');
const fs = require('fs');
const db = require('quick.db')

// files

const config = require('./config.json');

// stuff

const client = new Discord.Client();
client.commands = new Discord.Collection();

// prefix

const prefix = '!';


// connect to mysql

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

// register commands

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// set status

client.on('ready', () => {
    console.log('Bot On');

    var status = `Watching over ` + client.guilds.cache.size + ` servers`;
    client.user.setActivity(status);
});

// check for commands

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    // commands

    if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord, db);
    } else if (command === 'stats' || command === 'status') {
        client.commands.get('stats').execute(message, args, Discord, db, client);
    }

    // owner commands

    if (message.author.id === '474482013886480385') {
        if (command === 'reload') {
            client.commands.get('reload').execute(message, args, Discord, db, client);
        }
    }
});

// login to bot

client.login(config.token);