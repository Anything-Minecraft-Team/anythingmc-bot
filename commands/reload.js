module.exports = {
    name: 'reload',
    execute(message, args, Discord, db, client){
        db.add('bot.commandsRun', 1);
        
        try{
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            const command = require(`./${args[0]}.js`);
            client.commands.set(args[0], command);
        } catch (e){
            console.log(e);
            return message.channel.send(`Failed reload`);
        }
        message.channel.send(`Bot reloaded`);
    }
}