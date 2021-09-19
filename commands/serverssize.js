module.exports = {
    name: 'serverssize',
    execute(message, args, Discord, db, client) {
        const guilds = client.guilds.cache;
        guilds.forEach(g => {
            message.channel.send(g.name + ' ' + g.members.cache.size);
        });
    }
}