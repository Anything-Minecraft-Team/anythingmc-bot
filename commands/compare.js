module.exports = {
    name: 'compare',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        message.channel.send("Plan 1 \nHow much ram does plan 1 have?");

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Plan 1')
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .addFields(
            {name: 'Ram', value: 'How much ram does plan 1 have? Format, 2GB or 2000MB'}
            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

        message.channel.send(newEmbed);
    }
}