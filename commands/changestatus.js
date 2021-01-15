module.exports = {
    name: 'changestatus',
    execute(message, args, client){
        messageable = args.splice(0).join(" ")
        client.user.setActivity(messageable);
    }
}