module.exports = {
    name: 'permission',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Suggested Permission Plugin')
        .setDescription('Here is a suggested Permission Plugin')
        .addFields(
            {name: 'LuckPerms', value: 'LuckPerms is the best permissions plugin out there, it has everything you could ask for, bungee support, mysql, very customizable, lightweight and easy to use! It has its own website where they have a web editor for changing permissions and other cool settings. Link: https://luckperms.net/'}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}