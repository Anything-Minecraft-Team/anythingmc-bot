module.exports = {
    name: 'removetable',
    execute(message, args, Discord, con) {

        var sql = `DROP TABLE ${args[0]}_reviews`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });

        message.channel.send("removed table");
    }
}


