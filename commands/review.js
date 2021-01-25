module.exports = {
    name: 'review',
    execute(message, args, Discord, con, db) {
        db.add('bot.commandsRun', 1);

        message.delete();
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#2c5999')
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
            .addFields(
                { name: 'Which hosting provider would you like to review?', value: '[View a list of hosting providers you can review](https://github.com/JustDoom/minecraft-server-helper-bot/wiki/Reviewable-Hosting-Providers)\nIf you would like to suggest a hosting provider to add you can do that [here](https://github.com/JustDoom/minecraft-server-helper-bot/issues)' }
            ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        var hostingProviders = ["pebblehost", "birdflop", "mcprohosting", "shockbyte", "titannodes", "mixmlhosting", "winternode", "atlasnode", "logicservers", "bisecthosting", "sparkedhost", "scalacube", "cubedhost", "ggservers", "anvilnode", "beastnode ", "hostinger", "meloncube", "ramshard", "skynode", "minehut", "aternos"];

        let filter = m => m.author.id === message.author.id
        message.channel.send(newEmbed).then(sentMessage => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
                .then(message => {
                    message = message.first()
                    if (hostingProviders.includes(message.content.toLowerCase())) {
                        let selectedProvider = message.content.toLowerCase();
                        con.query(`SELECT * FROM ${selectedProvider}_reviews WHERE userID = ${message.author.id}`, function (err, result, fields) {
                            if (err) throw err;
                            if (result.length) {
                                message.delete();
                                const receivedEmbed = sentMessage.embeds[0];
                                receivedEmbed.fields = [];
                                const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                    .setColor('#2c5999')
                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                    .addFields(
                                        { name: 'Review Canceled', value: 'You have already reviewed this hosting provider' }
                                    ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

                                sentMessage.edit(newEmbedReviewed);
                            } else {
                                message.delete();
                                const receivedEmbed = sentMessage.embeds[0];
                                receivedEmbed.fields = [];
                                const newEmbed2 = new Discord.MessageEmbed(receivedEmbed)
                                    .setColor('#2c5999')
                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                    .addFields(
                                        { name: 'Review Text', value: 'Write your review here! You have 10 minutes before its canceled.' }
                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                sentMessage.edit(newEmbed2).then(sentMessage => {
                                    message.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 600000,
                                        errors: ['time']
                                    })
                                        .then(message => {
                                            message = message.first()
                                            if (message !== null) {
                                                let reviewText = message.content;
                                                message.delete();
                                                const receivedEmbed = sentMessage.embeds[0];
                                                receivedEmbed.fields = [];
                                                const newEmbed3 = new Discord.MessageEmbed(receivedEmbed)
                                                    .setColor('#2c5999')
                                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                    .addFields(
                                                        { name: 'Review Stars', value: 'How many stars do you rate the hosting provider? 1 is the worst and 5 is the best.' }
                                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                sentMessage.edit(newEmbed3).then(sentMessage => {
                                                    message.channel.awaitMessages(filter, {
                                                        max: 1,
                                                        time: 30000,
                                                        errors: ['time']
                                                    })
                                                        .then(message => {
                                                            message = message.first()
                                                            if (['1', '2', '3', '4', '5'].includes(message.content)) {
                                                                let selectedRating = message.content
                                                                let stars = '';
                                                                if (message.content === '1') {
                                                                    stars = '⭐';
                                                                } else if (message.content === '2') {
                                                                    stars = '⭐⭐';
                                                                } else if (message.content === '3') {
                                                                    stars = '⭐⭐⭐';
                                                                } else if (message.content === '4') {
                                                                    stars = '⭐⭐⭐⭐';
                                                                } else if (message.content === '5') {
                                                                    stars = '⭐⭐⭐⭐⭐';
                                                                }
                                                                message.delete();
                                                                const receivedEmbed = sentMessage.embeds[0];
                                                                receivedEmbed.fields = [];
                                                                const newEmbed4 = new Discord.MessageEmbed(receivedEmbed)
                                                                    .setColor('#2c5999')
                                                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                    .addFields(
                                                                        { name: 'Confirm Review?', value: 'This is your review, would you like to submit this? Yes or No.' },
                                                                        { name: "Your Review", value: reviewText },
                                                                        { name: 'Rating', value: stars }
                                                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                                sentMessage.edit(newEmbed4).then(sentMessage => {
                                                                    message.channel.awaitMessages(filter, {
                                                                        max: 1,
                                                                        time: 30000,
                                                                        errors: ['time']
                                                                    })
                                                                        .then(message => {
                                                                            message = message.first()
                                                                            if (message.content.toLowerCase() === 'yes') {
                                                                                con.query(`INSERT INTO review_queue (userID, rating, review, provider) VALUES (${message.author.id}, ${selectedRating}, '${reviewText}', '${selectedProvider}')`), (err, result) => {
                                                                                    if (err) throw err;
                                                                                };
                                                                                message.delete();
                                                                                const receivedEmbed = sentMessage.embeds[0];
                                                                                receivedEmbed.fields = [];
                                                                                const newEmbed5 = new Discord.MessageEmbed(receivedEmbed)
                                                                                    .setColor('#2c5999')
                                                                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                                    .addFields(
                                                                                        { name: 'Submited', value: 'Your review has been submited!.' }
                                                                                    ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                                                sentMessage.edit(newEmbed5);
                                                                            } else if (message.content.toLowerCase() === 'no') {
                                                                                message.delete();
                                                                                const receivedEmbed = sentMessage.embeds[0];
                                                                                receivedEmbed.fields = [];
                                                                                const embedCancel = new Discord.MessageEmbed(receivedEmbed)
                                                                                    .setColor('#2c5999')
                                                                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                                    .addFields(
                                                                                        { name: 'You canceled your review', value: 'Type /review to review another hosting provider.' }
                                                                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                                                sentMessage.edit(embedCancel);
                                                                            } else {
                                                                                message.delete();
                                                                                const receivedEmbed = sentMessage.embeds[0];
                                                                                receivedEmbed.fields = [];
                                                                                const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                                                                                    .setColor('#2c5999')
                                                                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                                    .addFields(
                                                                                        { name: 'Your review was terminated', value: `${message.content} is not a valid response` }
                                                                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                                                sentMessage.edit(embedterminated);
                                                                            }
                                                                        })
                                                                        .catch(collected => {
                                                                            const receivedEmbed = sentMessage.embeds[0];
                                                                            receivedEmbed.fields = [];
                                                                            const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                                                                                .setColor('#2c5999')
                                                                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                                .addFields(
                                                                                    { name: 'You took to long', value: 'You didnt answer in time, you took 30 seconds too long.' }
                                                                                ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                                            sentMessage.edit(embedterminated);
                                                                        });
                                                                })
                                                            } else {
                                                                const receivedEmbed = sentMessage.embeds[0];
                                                                receivedEmbed.fields = [];
                                                                const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                                                                    .setColor('#2c5999')
                                                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                    .addFields(
                                                                        { name: 'Your review was terminated', value: `${message.content} is not a valid response` }
                                                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                                sentMessage.edit(embedterminated);
                                                            }
                                                        })
                                                        .catch(collected => {
                                                            const receivedEmbed = sentMessage.embeds[0];
                                                            receivedEmbed.fields = [];
                                                            const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                                                                .setColor('#2c5999')
                                                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                .addFields(
                                                                    { name: 'You took to long', value: 'You didnt answer in time, you took 30 seconds too long.' }
                                                                ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                            sentMessage.edit(embedterminated);
                                                        });
                                                })
                                            } else {
                                                const receivedEmbed = sentMessage.embeds[0];
                                                receivedEmbed.fields = [];
                                                const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                                                    .setColor('#2c5999')
                                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                    .addFields(
                                                        { name: 'Your review was terminated', value: `${message.content} is not a valid response` }
                                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                                sentMessage.edit(embedterminated);
                                            }
                                        })
                                        .catch(collected => {
                                            const receivedEmbed = sentMessage.embeds[0];
                                            receivedEmbed.fields = [];
                                            const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                                                .setColor('#2c5999')
                                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                .addFields(
                                                    { name: 'You took to long', value: 'You didnt answer in time, you took 30 seconds too long.' }
                                                ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                            sentMessage.edit(embedterminated);
                                        });
                                })
                            }
                        });
                    } else {
                        const receivedEmbed = sentMessage.embeds[0];
                        receivedEmbed.fields = [];
                        const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                            .setColor('#2c5999')
                            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                            .addFields(
                                { name: 'Your review was terminated', value: `${message.content} is not a valid response` }
                            ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                        sentMessage.edit(embedterminated);
                    }
                })
                .catch(collected => {
                    const receivedEmbed = sentMessage.embeds[0];
                    receivedEmbed.fields = [];
                    const embedterminated = new Discord.MessageEmbed(receivedEmbed)
                        .setColor('#2c5999')
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: 'You took to long', value: 'You didnt answer in time, you took 30 seconds too long.' }
                        ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                    sentMessage.edit(embedterminated);
                });
        })
    }
}


