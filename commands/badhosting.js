module.exports = {
    name: 'badhosting',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#2c5999')
        .setTitle('Bad Hosting Providers')
        .setDescription('Here a list of hosting providers you should generaly stay away from')
        .addFields(
            {name: 'MCProHosting', value: 'The reason you should stay away from MCProHosting is because they are extremly over priced, $7.99 for 1gb of ram and 25 player limit. Firstly you can get 1gb ram for a couple $$ at other hosting providers and secondly they shouldnt have a limit of players set, they should let you have as many as you want (Or how ever many the server can handle).'},
            {name: 'Shockbyte Hosting', value: 'Shockbyte has a different reason you should stay away from them, their server are known to lag for no reason no matter how much ram you add. They also have bad support, multiple people have wanted refunds and complained that they didnt get any, I have no idea if this is true so be careful.'},
            {name: 'TitanNodes', value: 'TitanNodes may be cheap so dont be tricked. There have been complaints of the owner of TitanNodes being rude or ignoring people asking question or needing support and apparently even gone as far as releasing the persons private ip adress. Their support is also pretty bad.'},
            {name: 'Exaroton', value: 'Exaroton is different to other hosts, they make you buy credits which then you pay for server in them. Their price is 1 credit / 1 GB RAM / 1 hour. So if you wanted to run a 24/7 server with about 4gb ram (good for a private server, not a public on really) you would need over $50 to run it for just one month, on pebblehost you could get a 25gb server that runs 24/7 for 1 month or a birdflop server with 20gb of ram for $40 for one month (both of these are the hosting highest premium plans) instead of 4gb for 1 month. They also dont let you upload custm plugins or server jars. Exaroton oversells extremly. NEVER USE THEM'}
        )

        message.channel.send(newEmbed);
    }
}