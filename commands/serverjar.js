module.exports = {
    name: 'serverjar',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Suggested Server Jars')
        .setDescription('Here is a suggested Server Jars to use for your server')
        .addFields(
            {name: 'PaperMC', value: 'PaperMC is a fork of spigot that aims to improve performance '},
            {name: 'Purpur', value: 'Purpur is a fork of '}
        )

        message.channel.send(newEmbed);
    }
}