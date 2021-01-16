module.exports = {
    name: 'help',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Help')
        .setDescription('Help Message')
        .addFields(
            {name: 'Prefix', value: 'The commands prefix is /'},
            {name: '/review', value: 'Lets you review hosting providers through the bot, does not put the review on trustpilot or any other reviewing websites. This command is new and still in testing, if you find any bugs please contact the creator (JustDoom#1120) or make an issue on its github repo, to find it do /code. You currently cant see submitted reviews but that is being worked on currently.'},
            {name: '/anticheat', value: 'Brings up a list of suggested anti-cheat plugins'},
            {name: '/permission', value: 'Brings up a suggested permission plugin'},
            {name: '/serverjar', value: 'Brings up a list of suggested server jars to use for your server'},
            {name: '/hosting, /hosts', value: 'Brings up a list of suggested hosting providers'},
            {name: '/badhosting, /badhosts', value: 'Brings up a list of hosting providers you should stay away from'},
            {name: '/code, /github, /repo', value: 'Brings up an embed with the github link'}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}