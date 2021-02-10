module.exports = {
    name: 'changestatus',
    execute(message, args, client, db) {
        messageable = args.splice(0).join(" ")
        client.user.setActivity(messageable);

        if (args[0] === 'perm') {
            db.set(`bot.status`, messageable);
        }
    }
}