module.exports = {
    name: 'hosting',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Suggested Server Hosting')
        .setDescription('Here are some hosting suggestions, currently most of these are just ones im familiar with')
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .addFields(
            {name: 'Pebblehost', value: 'Pebblehost is a cheap and good hosting company, they have a budget plan thats $1 per gb of ram and also have a premium plan and dedicated servers. Pebblehost is overall a decent hosting to go with. Some people have said that you shouldnt use them for a public big network server and only private servers but youll have to see yourself. Link: https://pebblehost.com/'},
            {name: 'Birdflop', value: 'Birdflop Hosting is fairly new but already has recieved positive reviews, the owner is active on their discord and is very friendly, support wait time for me was extremely fast. Like pebblehost they do cheap servers, but unlike them they dont oversell their machines so you can use aikar flags (optimizes java startup process A LOT). Link: https://www.birdflop.com/'},
            {name: 'Finding More Hosting Options', value: 'If you would like to see more options you can look here, its a hosting discusion where people looking for hosting can find hosting, hosting providers with let you know what they can give you in terms of a server. The people running this change the discusion to a new link every few months or so to keep it fresh. Link: https://www.reddit.com/r/admincraft/comments/kokt54/admincraft_marketplace_q1_2021/'}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}