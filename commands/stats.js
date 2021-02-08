module.exports = {
    name: 'stats',
    execute(message, args, Discord, db, os, client, moment) {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const used = (process.memoryUsage().heapUsed / 1024 / 1024 * 2).toFixed(2);

        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#2c5999')
            .setTitle('Stats')
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
            .addFields(
                { name: `Commands Run`, value: `${db.get('bot.commandsRun')}` },
                { name: `Reviews Submitted`, value: `${db.get('bot.reviewsSubmitted')}` },
                { name: `Pending Reviews`, value: `${db.get('bot.pendingReviews')}` },
                { name: `Servers`, value: `${db.get('bot.server')}` },
                // {name: `CPU usage`, value: `${cpuPercent}`},
                { name: `RAM Usage`, value: `${Math.round(used * 100) / 100} MB` },
                { name: `Uptime`, value: `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds` },
                { name: `Ping`, value: `🏓Latency is ${Date.now() - message.createdTimestamp}ms.`}
            ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}