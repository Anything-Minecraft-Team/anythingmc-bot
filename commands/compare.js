module.exports = {
    name: 'compare',
    execute(message, args, Discord){
        message.channel.send("Plan 1 \nHow much ram does plan 1 have?");

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Plan 1')
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .addFields(
            {name: 'Ram', value: 'How much ram does plan 1 have? Format, 2GB or 2000MB'}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}