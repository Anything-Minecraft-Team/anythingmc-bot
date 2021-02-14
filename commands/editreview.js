module.exports = {
    name: 'editreview',
    execute(message, args, Discord, con, client, db) {
        var hostingProviders = ["pebblehost", "birdflop", "mcprohosting", "shockbyte", "titannodes", "mixmlhosting", "winternode", "atlasnode", "logicservers", "bisecthosting", "sparkedhost", "scalacube", "cubedhost", "ggservers", "anvilnode", "beastnode ", "hostinger", "meloncube", "ramshard", "skynode", "minehut", "aternos", "dedicatedmc", "elixirnode", "forestracks", "byteania", "apexhosting", "humbleservers"];

        if (args.length && hostingProviders.includes(args[0].toLowerCase())) {

            con.query(`SELECT * FROM ${args[0].toLowerCase()}_reviews WHERE userID = ${message.author.id}`, function (err, result, fields) {
                if (err) throw err;
                if (result.length) {
                    const newEmbed2 = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: `Are you sure?`, value: `Are you sure you want to edit your review?\nYes/No` }
                        ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

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

                                    message.delete();
                                    const receivedEmbed = sentMessage.embeds[0];
                                    receivedEmbed.fields = [];
                                    const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                        .setColor('#2c5999')
                                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                        .addFields(
                                            { name: 'Edit review', value: 'Submit an edited review.' },
                                            { name: 'Old Review', value: `${result[0].review}` }
                                        ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

                                    let filter = m => m.author.id === message.author.id
                                    sentMessage.edit(newEmbedReviewed).then(sentMessage => {
                                        message.channel.awaitMessages(filter, {
                                            max: 1,
                                            time: 600000,
                                            errors: ['time']
                                        })
                                            .then(message => {
                                                message = message.first()
                                                var sql = `UPDATE ${args[0].toLowerCase()}_reviews SET review = ${message.content} WHERE userID = ${message.author.id}`;
                                                con.query(sql, function (err, result) {
                                                    if (err) {
                                                        message.channel.send(`Error, couldn't remove your review.`);
                                                        throw err;
                                                    } else {
                                                        message.delete();
                                                        const receivedEmbed = sentMessage.embeds[0];
                                                        receivedEmbed.fields = [];
                                                        const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                                            .setColor('#2c5999')
                                                            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                            .addFields(
                                                                { name: 'Edit review', value: 'Submit an edited review.' },
                                                                { name: 'Old Review', value: `${result[0].review}` }
                                                            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')
                                                    }
                                                });
                                            })
                                    })

                                } else if (message.content.toLowerCase() === 'no') {
                                    message.delete();
                                    const receivedEmbed = sentMessage.embeds[0];
                                    receivedEmbed.fields = [];
                                    const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                        .setColor('#2c5999')
                                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                        .addFields(
                                            { name: 'Review Edit Canceled', value: 'Your review will not be edited.' }
                                        ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

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
                        ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

                    message.channel.send(newEmbed);
                }
            });
        } else {
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#2c5999')
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                .addFields(
                    { name: `Invalid Provider`, value: `This is not a valid hosting provider. Look at the full list [here](https://github.com/JustDoom/minecraft-server-helper-bot/wiki/Reviewable-Hosting-Providers)` }
                ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

            message.channel.send(newEmbed);
        }
    }
}