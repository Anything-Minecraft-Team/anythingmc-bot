const Discord = require('discord.js');

const mysql = require('mysql');

const client = new Discord.Client();

const db = require('quick.db')

client.commands = new Discord.Collection();

const config = require('./config.json');

const fs = require('fs');

const prefix = '/';

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

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot On');

    var status = db.get(`bot.status`);
    client.user.setActivity(status);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    //===========================
    //       All Commands      
    //===========================

    if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord, db);
    }

    //===========================
    //      Owner Commands     
    //===========================

    if (message.author.id === '474482013886480385') {
        if (command === 'changestatus') {
            client.commands.get('changestatus').execute(message, args, client, db);
        }
    }
});

client.login(config.token);