module.exports = {
    name: 'removereview',
    execute(message, args, Discord, con, client, db) {
        var hostingProviders = ["pebblehost", "birdflop", "mcprohosting", "shockbyte", "titannodes", "mixmlhosting", "winternode", "atlasnode", "logicservers", "bisecthosting", "sparkedhost", "scalacube", "cubedhost", "ggservers", "anvilnode", "beastnode ", "hostinger", "meloncube", "ramshard", "skynode", "minehut", "aternos", "dedicatedmc", "elixirnode", "forestracks"];

        if (args.length && hostingProviders.includes(args[0].toLowerCase())) {

            con.query(`SELECT * FROM ${args[0].toLowerCase()}_reviews WHERE userID = ${message.author.id}`, function (err, result, fields) {
                if (err) throw err;
                if (result.length) {
                    const newEmbed2 = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: `Are you sure?`, value: `Are you sure you want to remove your review?\nYes/No` }
                        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                    let filter = m => m.author.id === message.author.id
                    message.channel.send(newEmbed2).then(sentMessage => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time']
                        })
                            .then(message => {
                                message = message.first()
                                if (message.content.toLowerCase() === 'yes') {
                                    var sql = `DELETE FROM ${args[0].toLowerCase()}_reviews WHERE userID = ${message.author.id}`;
                                    con.query(sql, function (err, result) {
                                        if (err) {
                                            message.channel.send(`Error, couldn't remove your review.`);
                                            throw err;
                                        }
                                    });

                                    db.subtract('bot.reviewsSubmitted', 1);

                                    message.delete();
                                    const receivedEmbed = sentMessage.embeds[0];
                                    receivedEmbed.fields = [];
                                    const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                        .setColor('#2c5999')
                                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                        .addFields(
                                            { name: 'Review Removed', value: 'Your review has been removed.' }
                                        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                                    sentMessage.edit(newEmbedReviewed);
                                } else if (message.content.toLowerCase() === 'no') {
                                    message.delete();
                                    const receivedEmbed = sentMessage.embeds[0];
                                    receivedEmbed.fields = [];
                                    const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                        .setColor('#2c5999')
                                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                        .addFields(
                                            { name: 'Review Remove Canceled', value: 'Your review will not be removed.' }
                                        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                                    sentMessage.edit(newEmbedReviewed);
                                }
                            });
                    });
                } else {
                    const newEmbed = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: `Couldn't get review`, value: `You don't have a review for this hosting company or there was an error.` }
                        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                    message.channel.send(newEmbed);
                }
            });
        } else {
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#2c5999')
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                .addFields(
                    { name: `Invalid Provider`, value: `This is not a valid hosting provider. Look at the full list [here](https://github.com/JustDoom/minecraft-server-helper-bot/wiki/Reviewable-Hosting-Providers)` }
                ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

            message.channel.send(newEmbed);
        }
    }
}