module.exports = {
    name: 'whatimdoing',
    execute(message, args, Discord, client2) {
        let filter = m => m.author.id === message.author.id
        const pickTitle = new Discord.MessageEmbed()
            .setColor('#2c5999')
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
            .addFields(
                { name: 'Pick a title', value: 'Example: How to install and use Fast Async World Edit (FAWE)' }
            ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')
        message.channel.send(pickTitle).then(sentMessage => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 300000,
                errors: ['time']
            })
                .then(message => {
                    message = message.first()
                    const title = message;
                    message.delete();
                    const receivedEmbed = sentMessage.embeds[0];
                    receivedEmbed.fields = [];
                    const pickLocation = new Discord.MessageEmbed()
                        .setColor('#2c5999')
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                        .addFields(
                            { name: 'Pick a location for your file', value: 'Example: tutorials/en_us/PLUGINS/FAWE.md' }
                        ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')
                    sentMessage.edit(pickLocation).then(sentMessage => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 3000000,
                            errors: ['time']
                        })
                            .then(message => {
                                message = message.first()
                                const people = message;
                                message.delete();
                                const receivedEmbed = sentMessage.embeds[0];
                                receivedEmbed.fields = [];
                                const pickLocation = new Discord.MessageEmbed()
                                    .setColor('#2c5999')
                                    .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                    .addFields(
                                        { name: 'Who will help with this?', value: 'Example: JustDoom, Silverarmor, Kruemmelspalter' }
                                    ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')
                                sentMessage.edit(pickLocation).then(sentMessage => {
                                    message.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 3000000,
                                        errors: ['time']
                                    })
                                        .then(message => {
                                            message = message.first()
                                            const location = message;
                                            message.delete();
                                            const receivedEmbed = sentMessage.embeds[0];
                                            receivedEmbed.fields = [];
                                            const confirm = new Discord.MessageEmbed()
                                                .setColor('#2c5999')
                                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                .addFields(
                                                    { name: 'Confirm?', value: 'Yes/No' },
                                                    { name: "Title", value: title },
                                                    { name: 'Location', value: location },
                                                    {name:'Contributors', value: people}
                                                ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')
                                            sentMessage.edit(confirm).then(sentMessage => {
                                                message.channel.awaitMessages(filter, {
                                                    max: 1,
                                                    time: 3000000,
                                                    errors: ['time']
                                                })
                                                    .then(message => {
                                                        message = message.first()
                                                        if (message.content.toLowerCase() === 'yes') {
                                                            message.delete();
                                                            const receivedEmbed = sentMessage.embeds[0];
                                                            receivedEmbed.fields = [];
                                                            const yes = new Discord.MessageEmbed()
                                                                .setColor('#2c5999')
                                                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                .setTitle('Confirmed')
                                                                .setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')
                                                            sentMessage.edit(yes);
                                                            const newEmbed = new Discord.MessageEmbed()
                                                                .setColor('#2c5999')
                                                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                .addFields(
                                                                    { name: 'Title', value: title },
                                                                    { name: 'Location', value: location },
                                                                    {name:'Contributors', value: people}
                                                                ).setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')

                                                            client2.channels.cache.get('803980191051153418').send(newEmbed);
                                                        } else {
                                                            message.delete();
                                                            const receivedEmbed = sentMessage.embeds[0];
                                                            receivedEmbed.fields = [];
                                                            const no = new Discord.MessageEmbed()
                                                                .setColor('#2c5999')
                                                                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                                                                .setTitle('Canceled')
                                                                .setFooter('Help keep the bot running by donating! PayPal.Me/justdoom')
                                                            sentMessage.edit(no);
                                                        }

                                                    })
                                                    .catch(collected => {
                                                        console.log(collected);
                                                    });
                                            });
                                        })
                                        .catch(collected => {
                                            console.log(collected);
                                        });
                                });
                            })
                            .catch(collected => {
                                console.log(collected);
                            });
                    });
                })
                .catch(collected => {
                    console.log(collected);
                });
        });
    }
}