module.exports = {
    name: 'help',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Help')
        .setDescription('Help Message')
        .addFields(
            {name: 'Prefix', value: 'The commands prefix is !'},
            {name: '!anticheat', value: 'Brings up a list of suggested anti-cheat plugins'},
            {name: '!permission', value: 'Brings up a suggested permission plugin'},
            {name: '!serverjar', value: 'Brings up a list of suggested server jars to use for your server'},
            {name: '!hosting', value: 'Brings up a list of suggested hosting providers'}
        )

        message.channel.send(newEmbed);
    }
}


