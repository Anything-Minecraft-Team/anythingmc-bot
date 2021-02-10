module.exports = {
    name: 'permission',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Suggested Permission Plugin')
        .setDescription('Here is a suggested Permission Plugin')
        .addFields(
            {name: 'LuckPerms', value: 'LuckPerms is the best permissions plugin out there, it has everything you could ask for, bungee support, mysql, very customizable, lightweight and easy to use! It has its own website where they have a web editor for changing permissions and other cool settings. Link: https://luckperms.net/'}
            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

        message.channel.send(newEmbed);
    }
}