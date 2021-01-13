module.exports = {
    name: 'serverjar',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Suggested Server Jars')
        .setDescription('Here is a suggested Server Jars to use for your server')
        .addFields(
            {name: 'PaperMC', value: 'PaperMC is a fork of spigot that aims to improve performance and adds tons of new features, one for example is a built in anti-xray! Its available for versions 1.8.8 to the current version, old version do not recieve updates or support. Link: https://papermc.io/'},
            {name: 'Tuinity', value: 'Tuinity is a fork of PaperMC that increases performance even further! Its essentially early access to PaperMC features as the creator of Tuinity helps develop PaperMC on its github, he created Tuinity because it took ages for the PaperMC team to accept his changes. It is available for 1.13.2 and above. Link: https://github.com/Spottedleaf/Tuinity'},
            {name: 'Purpur', value: 'Purpur is a fork of Tuinity (So many forks!). Its goal is to provide new and interesting configuration options, which allow for creating a unique gameplay experience not seen anywhere else! This also helps with performance. It is available for 1.14 and above. Link: https://github.com/pl3xgaming/Purpur'},
            {name: 'Recommended Server Jar', value: 'It is very highly recommended that you use purpur instead of spigot or PaperMC, it has more features and much better performance.'}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}