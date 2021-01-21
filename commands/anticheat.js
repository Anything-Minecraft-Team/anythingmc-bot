module.exports = {
    name: 'anticheat',
    execute(message, args, Discord, db){
        db.add('bot.commandsRun', 1);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Suggested Anti-Cheats')
        .setDescription('Here is a list of suggested Anti-Cheats')
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .addFields(
            {name: 'Vulcan', value: 'Vulcan is a super advanced anti-cheat, it is the best that you can buy. It has an api and the developer is super active and will help you solve anything thats wrong with the plugin! Its for all version 1.7 and above. Doesnt affect your server tps. It is a paid plugin but its cheap for what it can do. Link: https://www.spigotmc.org/resources/vulcan-advanced-cheat-detection-1-7-1-16-4.83626/\nVulcan Geyser\nSimple vulcan addon which does not inject and flag players using Geyser. Link: https://www.spigotmc.org/resources/vulcan-geyser.86726/'},
            {name: 'ThotPatrol', value: 'ThotPatrol is developed by the same person as Vulcan, its currently inactive and only for 1.7 and 1.8. It will be rebranded as Vulcan Lite at some point in the future. It is free. Link: https://www.spigotmc.org/resources/thotpatrol-advanced-cheat-detection-1-7-1-8.79978/'},
            {name: 'Warden', value: 'Warden is a good 1.8 and above free anti-cheat. A good free alternative to vulcan, this plugin was suggested by frap (Vulcan develeoper) himself. Link: https://www.spigotmc.org/resources/warden-guardian-of-your-server-modern-cheat-detection-1-8-1-16.81877/'},
            {name: 'Medusa', value: 'Medusa is an anti-cheat for 1.7 to 1.12, it is tested in 1.7/1.8 and experimental in 1.9 to 1.12. Frap also recommends this plugin as a free alternative anti-cheat'},
            {name: 'NoCheatPlus', value: 'A simple free anti-cheat plugin. You will need to configure the config as the default one is very bad, here is a suggested config someone has made but sadly it costs https://www.mc-market.org/resources/475/. Link: https://www.spigotmc.org/resources/nocheatplus-continued-1-16-x.85587/'}
            //{name: 'Recommended Anti-Cheats', value: 'Above was just a list of anti-cheats that are some of the best available. The recommended paid plugin is Vulcan, its good for all servers. The recommended free anti-cheat is warden for 1.9+ and for 1.7/1.8 is ThotPatrol. These may not be the best anti-cheats for your server specifically, these are just the best recommendadtions but hopefully they work for you.'}
        ).setFooter('Help keep the bot running by donating! www.paypal.com/donate?hosted_button_id=L8J9H7HTRY7L4')

        message.channel.send(newEmbed);
    }
}


