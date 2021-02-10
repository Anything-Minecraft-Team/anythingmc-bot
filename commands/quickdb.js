module.exports = {
    name: 'quickdb',
    execute(message, args, Discord, db) {
        var embed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('quickdb')
        .addFields(
            { name: `use`, value: `set/add/subtract database value` }
        )

        if (args[0] !== '' && args[1] !== '' && args[2] !== '') {
            if (args[0].toLowerCase() === 'set') {
                db.set(`bot.${args[1]}`, `${args[2]}`);

                embed = new Discord.MessageEmbed()
                    .setColor('#2c5999')
                    .setTitle('quickdb')
                    .addFields(
                        { name: `value`, value: `${args[1]} has been set to ${args[2]}` }
                    )
            } else if (args[0].toLowerCase() === 'add') {
                db.add(`bot.${args[1]}`, `${args[2]}`);

                embed = new Discord.MessageEmbed()
                    .setColor('#2c5999')
                    .setTitle('quickdb')
                    .addFields(
                        { name: `value`, value: `${args[1]} has had ${args[2]} added` }
                    )
            } else if (args[0].toLowerCase() === 'subtract') {
                db.subtract(`bot.${args[1]}`, `${args[2]}`);

                embed = new Discord.MessageEmbed()
                    .setColor('#2c5999')
                    .setTitle('quickdb')
                    .addFields(
                        { name: `value`, value: `${args[1]} has had ${args[2]} subtracted` }
                    )
            }
        }

        message.channel.send(embed);
    }
}