module.exports = {
    name: 'help',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Help')
        .setDescription('Help Message')
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .addFields(
            {name: 'Prefix', value: 'The commands prefix is /'},
            {name: '/invite', value: 'Sends the invite link for the discord bot!'},
            {name: '/review', value: 'Lets you review hosting providers through the bot, does not put the review on trustpilot or any other reviewing websites. This command is new and still in testing, if you find any bugs please contact the creator (JustDoom#1120) or make an issue on its github repo, to find it do /code. You currently cant see submitted reviews but that is being worked on currently.'},
            {name: '/ratings', value: 'Shows all the reviews for a certain hosting provider'},
            {name: '/removereview', value: 'Allows you to remove your review. Useful for if you want to edit your review.'},
            {name: '/anticheat', value: 'Brings up a list of suggested anti-cheat plugins'},
            {name: '/permission', value: 'Brings up a suggested permission plugin'},
            {name: '/serverjar', value: 'Brings up a list of suggested server jars to use for your server'},
            {name: '/hosting, /hosts', value: 'Brings up a list of suggested hosting providers'},
            {name: '/badhosting, /badhosts', value: 'Brings up a list of hosting providers you should stay away from'},
            {name: '/code, /github, /repo', value: 'Brings up an embed with the github link'},
            {name: '/stats', value: 'Displays statistics about the bot'},
            {name: 'Feature Request', value: 'If you would like to suggest a hosting provider to add you can do that [here](https://github.com/JustDoom/minecraft-server-helper-bot/issues)'}
            
            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

        message.channel.send(newEmbed);
    }
}