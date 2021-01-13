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
            {name: 'TitanNodes', value: 'TitanNodes may be cheap so dont be tricked. There have been complaints of the owner of TitanNodes being rude or ignoring people asking question or needing support and apparently even gone as far as releasing the persons private ip adress. Their support is also pretty bad.'}
        )

        message.channel.send(newEmbed);
    }
}