module.exports = {
    name: 'servers',
    execute(message, args, Discord, client) {
        const guilds = client.guilds.cache;
        guilds.forEach(g => {
            console.log(g.name + ' ' + g.members.cache.size);
        });
    }
}