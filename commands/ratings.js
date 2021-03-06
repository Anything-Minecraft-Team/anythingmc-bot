module.exports = {
    name: 'ratings',
    execute(message, args, Discord, con, client, db) {

        db.add('bot.commandsRun', 1);

        if (!args.length < 1) {
            con.query(`SELECT * FROM ${args[0]}_reviews`, function (err, result, rows) {
                if (err) {
                    const newEmbede = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setTitle(`Error`)
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: `Not a recognised hosting provider`, value: `This hosting is not in the list or you accidentally made a spelling mistake.\nIf you would like to suggest a hosting provider to add you can do that [here](https://github.com/JustDoom/minecraft-server-helper-bot/issues)` }
                        ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

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
                        ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

                    message.channel.send(newEmbede);
                } else {
                    client.users.fetch(result[0].userID).then((user) => {

                        con.query(`SELECT rating FROM ${args[0]}_reviews`, function (err, result2, rows) {
                            if (err) throw err;
                            var overallRating = 0;
                            var total = 0;
                            var i;
                            for (i = 0; i < result2.length; i++) {
                                total = total + result2[i].rating;
                            }

                            overallRating = total / result2.length;

                            const newEmbede = new Discord.MessageEmbed()
                                .setColor('#2c5999')
                                .setTitle(`${args[0]} Reviews`)
                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                .addFields(
                                    { name: `Overall Rating`, value: `${overallRating}` },
                                    { name: `${user.username}'s Review`, value: `${result[0].review}` },
                                    { name: `Rating`, value: `${result[0].rating}` }
                                ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

                            message.channel.send(newEmbede).then(function (bmessage) {
                                bmessage.react(`◀️`).then(() => bmessage.react('▶️'));
                                reactionWait(bmessage, result.length - 1, 0, message);
                            })
                        })
                    })
                }

                function reactionWait(mess, len, page, author) {

                    const filter = (reaction, user) => {
                        return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === author.author.id;
                    };

                    mess.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();

                            reaction.users.remove(author.author.id);

                            if (reaction.emoji.name === '▶️') {
                                page = page + 1;
                                if (page > len) {
                                    page = page - 1;
                                } else {
                                    var receivedEmbed = mess.embeds[0];
                                    receivedEmbed.fields = [];
                                    client.users.fetch(result[page].userID).then((user) => {
                                        const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                            .setColor('#2c5999')
                                            .setTitle('Review')
                                            .setAuthor(`${author.author.username}`, `${author.author.avatarURL()}`)
                                            .addFields(
                                                { name: `${user.username}'s Review`, value: `${result[page].review}` },
                                                { name: 'Rating', value: `${result[page].rating}` }
                                            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

                                        mess.edit(newEmbedReviewed);
                                    })
                                }
                            } else if (reaction.emoji.name === '◀️') {
                                page = page - 1;
                                if (0 > page) {
                                    page = page + 1;
                                } else {
                                    var receivedEmbed = mess.embeds[0];
                                    receivedEmbed.fields = [];
                                    client.users.fetch(result[page].userID).then((user) => {
                                        const newEmbedReviewed = new Discord.MessageEmbed(receivedEmbed)
                                            .setColor('#2c5999')
                                            .setTitle('Review')
                                            .setAuthor(`${author.author.username}`, `${author.author.avatarURL()}`)
                                            .addFields(
                                                { name: `${user.username}'s Review`, value: `${result[page].review}` },
                                                { name: 'Rating', value: `${result[page].rating}` }
                                            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

                                        mess.edit(newEmbedReviewed);
                                    })
                                }
                            }

                            reactionWait(mess, len, page, author);
                        })
                        .catch(collected => {
                        });
                }
            })
        } else {
            const newEmbede = new Discord.MessageEmbed()
                .setColor('#2c5999')
                .setTitle(`Error`)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                .addFields(
                    { name: `No specified hosting provider`, value: `You need to enter a hosting provider from [this list](https://github.com/JustDoom/minecraft-server-helper-bot/wiki/Reviewable-Hosting-Providers) after the word rating like this, /ratings birdflop.\nIf you would like to suggest a hosting provider to add you can do that [here](https://github.com/JustDoom/minecraft-server-helper-bot/issues)` }
                ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

            message.channel.send(newEmbede);
        }
    }
}

function getRating() {
    try {

    } catch {

    }
}