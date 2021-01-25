module.exports = {
    name: 'reviewsubmitted',
    execute(message, args, Discord, con, client, db) {

        con.query("SELECT * FROM review_queue", function (err, result, rows) {
            if (err) {
                return console.log('Error1');
            } else if (!result) {
                return console.log('Error2');
            } else if (result.length < 1){
                const newEmbede = new Discord.MessageEmbed()
                    .setColor('#2c5999')
                    .setTitle('Review')
                    .addFields(
                        { name: `No reviews`, value: `There are no submitted reviews currently` }
                    )

                message.channel.send(newEmbede);
            } else {
                const newEmbed = new Discord.MessageEmbed()
                    .setColor('#2c5999')
                    .setTitle('Review')
                    .addFields(
                        { name: `${client.users.cache.get(result[0].userID).username}'s review`, value: `${result[0].review}\n${result[0].rating}\n${result[0].provider}` }
                    )

                    console.log(result[0]);

                let filter = m => m.author.id === message.author.id
                message.channel.send(newEmbed).then(() => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    })
                        .then(message => {
                            message = message.first()
                            if (message.content.toLowerCase() === 'accept') {
                                try{
                                    client.users.cache.get(result[0].userID).send('Your review has been accepted, good job!')
                                } catch(err){
                                    console.log('Unable to send dm');
                                    console.log(err);
                                }
                                

                                var sql = `INSERT INTO ${result[0].provider}_reviews (userID, rating, review) VALUES ('${result[0].userID}', "${result[0].rating}", "${result[0].review}")`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                });

                                var sql = `DELETE FROM review_queue WHERE userID = '${result[0].userID}'`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                });

                                const newEmbed1 = new Discord.MessageEmbed()
                                    .setColor('#2c5999')
                                    .setTitle('Review')
                                    .addFields(
                                        { name: `Review Accepted`, value: `This review has been accepted` }
                                    )

                                db.subtract('bot.pendingReviews', 1);
                                db.add('bot.reviewsSubmitted', 1);

                                message.channel.send(newEmbed1);
                            } else if (message.content.toLowerCase() === 'decline') {
                                try{
                                    client.users.cache.get(result[0].userID).send('Your review has been declined, this either happens because its inappropriate, a troll or spam')
                                } catch(err){
                                    console.log('Unable to send dm');
                                    console.log(err);
                                }

                                var sql = `DELETE FROM review_queue WHERE userID = '${result[0].userID}'`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                });

                                db.subtract('bot.pendingReviews', 1);

                                const newEmbed2 = new Discord.MessageEmbed()
                                    .setColor('#2c5999')
                                    .setTitle('Review')
                                    .addFields(
                                        { name: `Review Declined`, value: `Review as declined` }
                                    )

                                message.channel.send(newEmbed2);
                            }
                        })
                        .catch(collected => {
                            message.channel.send('Timeout');
                            console.log(collected);
                        });
                });
            }
        })
    }
}