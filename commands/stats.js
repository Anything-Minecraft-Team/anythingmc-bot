module.exports = {
    name: 'stats',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Stats')
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .addFields(
            {name: `Commands run`, value: `${db.get('bot.commandsRun')}`},
            {name: `Reviews submitted`, value: `${db.get('bot.reviewsSubmitted')}`},
            {name: `Pending Reviews`, value: `${db.get('bot.pendingReviews')}`},
            {name: `Servers`, value: `${db.get('bot.server')}`}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}


