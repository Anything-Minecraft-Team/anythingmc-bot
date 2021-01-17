module.exports = {
    name: 'ratings',
    execute(message, args, Discord, con, client) {

        var hostingProviders = ["pebblehost", "birdflop", "mcprohosting", "shockbyte", "titannodes", "mixmlhosting", "winternode", "atlasnode"];

        if (!args.length < 1) {
            con.query(`SELECT * FROM ${args[0]}_reviews`, function (err, result, rows) {
                if (err) {
                    const newEmbede = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setTitle(`Error`)
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: `Not a recognised hosting provider`, value: `This hosting is not in the list or you accidentally made a spelling mistake.` }
                        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                    message.channel.send(newEmbede);
                } else if (!result) {
                    return console.log('Error2');
                } else if (result.length < 1) {
                    const newEmbede = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setTitle(`${args[0]} Reviews`)
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: `No reviews`, value: `There are no submitted reviews currently` }
                        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                    message.channel.send(newEmbede);
                } else {
                    const newEmbede = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setTitle(`${args[0]} Reviews`)
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: `${client.users.cache.get(result[0].userID).username}'s Review`, value: `${result[0].review}` },
                            { name: `Rating`, value: `${result[0].rating}` }
                        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                    message.channel.send(newEmbede).then(function (message) {
                        message.react(`◀️`).then(() => message.react('▶️'));
                        

                    })
                }
            })
        } else {
            const newEmbede = new Discord.MessageEmbed()
                    .setColor('#2c5999')
                    .setTitle(`Error`)
                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                    .addFields(
                        { name: `No specified hosting provider`, value: `You need to enter a hosting provider from [this list](https://github.com/JustDoom/minecraft-server-helper-bot/wiki/Reviewable-Hosting-Providers) after the word rating like this, /ratings birdflop.` }
                    ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                message.channel.send(newEmbede);
        }
    }
}