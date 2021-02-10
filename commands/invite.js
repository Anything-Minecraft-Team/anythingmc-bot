module.exports = {
    name: 'invite',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Bot Invite')
        .setDescription(`Thanks for using Minecraft Bot Helper! \n[Click here to invite this bot to your discord server!](https://discord.com/oauth2/authorize?client_id=798419358074011668&scope=bot&permissions=66584128)`)
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

        message.channel.send(newEmbed);
    }
}