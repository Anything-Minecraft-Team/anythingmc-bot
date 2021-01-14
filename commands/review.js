module.exports = {
    name: 'review',
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#2c5999')
            .setTitle('Review A Hosting Provider')
            .addFields(
                { name: 'What hosting provider would you like to review?', value: 'Options:\nPebblehost\nBirdflop' }
            ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        var hostingProviders = ['pebblehost', 'birdflop'];

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
        message.channel.send(newEmbed);
        collector.on('collect', message => {
            if (hostingProviders.includes(message.content.toLowerCase()) && !message.author.bot) {
                const newEmbed2 = new Discord.MessageEmbed()
                    .setColor('#2c5999')
                    .setTitle('Review')
                    .addFields(
                        { name: 'Review Text', value: 'Write your review here! You have 10 minutes before its canceled.' }
                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                message.channel.send(newEmbed2);
                const collector2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 600000 });
                collector2.on('collect', message => {
                    if (message !== null && !message.author.bot) {
                        let reviewText = message.content;
                        const newEmbed3 = new Discord.MessageEmbed()
                            .setColor('#2c5999')
                            .setTitle('Rate The Hosting Provider')
                            .addFields(
                                { name: 'Review Stars', value: 'How many stars do you rate the hosting provider? 1 is the worst and 5 is the best.' }
                            ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                        message.channel.send(newEmbed3);
                        const collector3 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
                        collector3.on('collect', message => {
                            if (['1', '2', '3', '4', '5'].includes(message.content) && !message.author.bot) {
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
                                const newEmbed4 = new Discord.MessageEmbed()
                                    .setColor('#2c5999')
                                    .setTitle('Review')
                                    .addFields(
                                        { name: 'Confirm Review?', value: 'This is your review, would you like to submit this? Yes or No.' },
                                        { name: "Your Review", value: reviewText },
                                        { name: 'Rating', value: stars }
                                    ).setFooter('Help keep the bot running by donating! \nwww.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                message.channel.send(newEmbed4)
                                const collector4 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
                                collector4.on('collect', message => {
                                    if (message.content.toLowerCase() === 'yes' && !message.author.bot) {
                                        const newEmbed5 = new Discord.MessageEmbed()
                                            .setColor('#2c5999')
                                            .setTitle('Review')
                                            .addFields(
                                                { name: 'Submited', value: 'Your review has been submited!.' }
                                            ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')
                                        message.channel.send(newEmbed5);
                                        return;
                                    } else if (message.content.toLowerCase() === 'no' && !message.author.bot) {
                                        message.channel.send('Review canceled');
                                    } else {
                                        message.channel.send('Terminated: Invalid Response');
                                    }
                                })
                            }  else {
                                message.channel.send(`Terminated: Invalid Response`)
                            }
                        })
                    }
                })
            }
        })
    

        /**let filter = message => message.author.id === message.author.id
        message.channel.send(newEmbed).then(() => {
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
            })
            .then(message => {
            message = message.first()
            
            })
            .catch(collected => {
                message.channel.send('Timeout');
            });
        })**/
    }
}


