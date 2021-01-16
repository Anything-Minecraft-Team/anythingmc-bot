module.exports = {
    name: 'createtable',
    execute(message, args, Discord, con) {

        var sql = `CREATE TABLE ${args[0]}_reviews (userID VARCHAR(100), rating int, review VARCHAR(1500))`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });

        message.channel.send("created table");
    }
}


