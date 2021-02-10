const Discord = require('discord.js');

const mysql = require('mysql');

const client = new Discord.Client();

const db = require('quick.db')

var os = require('node-os-utils');

var moment = require('moment');

client.commands = new Discord.Collection();

const config = require('./config.json');

const fs = require('fs');

const prefix = '/';

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

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    //===========================
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
    } else if (command === 'stats' || command === 'status') {
        client.commands.get('stats').execute(message, args, Discord, db, os, client, moment);
    } else if (command === 'removereview') {
        client.commands.get('removereview').execute(message, args, Discord, con, client, db);
    }

    //===========================
    //||    Owner Commands     ||
    //===========================

    if (message.author.id === '474482013886480385') {
        if (command === 'changestatus') {
            client.commands.get('changestatus').execute(message, args, client, db);
        } else if (command === 'createtable') {
            client.commands.get('createtable').execute(message, args, Discord, con);
        } else if (command === 'removetable') {
            client.commands.get('removetable').execute(message, args, Discord, con);
        } else if (command === 'reviewsubmitted') {
            client.commands.get('reviewsubmitted').execute(message, args, Discord, con, client, db);
        } else if (command === 'quickdb') {
            client.commands.get('quickdb').execute(message, args, Discord, db);
        } else if (command === 'servers'){
            client.commands.get('servers').execute(message, args, Discord, client);
        }
    }
});

client.login(config.token);