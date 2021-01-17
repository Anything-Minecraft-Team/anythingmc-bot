module.exports = {
    name: 'invite',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Bot Invite')
        .setDescription(`Thanks for using Minecraft Bot Helper! \n[Click here to invite this bot to your discord server!](https://discord.com/oauth2/authorize?client_id=798419358074011668&scope=bot&permissions=66584128)`)
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}