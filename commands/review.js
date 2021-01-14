module.exports = {
    name: 'review',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Review A Hosting Provider')
        .addFields(
            {name: 'What hosting provider would you like to review?', value: 'Options:\nPebblehost\nBirdflop'}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        var hostingProviders = ['pebblehost', 'birdflop'];

        let filter = message => message.author.id === message.author.id
        message.channel.send(newEmbed).then(() => {
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
            })
            .then(message => {
            message = message.first()
            if (hostingProviders.includes(message.content)) {
                message.channel.send(`Deleted`)
            } else {
                message.channel.send(`Terminated: Invalid Response`)
            }
            })
            .catch(collected => {
                message.channel.send('Timeout');
            });
        })
    }
}


