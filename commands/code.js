module.exports = {
    name: 'code',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Bot Development')
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .addFields(
            {name: 'Want to help with the development or are you interested in how this bot work?', value: 'Well look no further! This bot is open source for anyone to look at! If you would like to help development or donate that would be very appreciated! Here is the github repository link https://github.com/JustDoom/minecraft-server-helper-bot and in the embed footer is the donation link, it helps keep the bot up and running!'}
            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

        message.channel.send(newEmbed);
    }
}


