package org.anythingmc.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.anythingmc.Main;

public class CommandHandler extends ListenerAdapter {

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {

        Message msg = event.getMessage();

        if (!msg.getContentRaw().startsWith(Main.getPrefix()) || msg.getAuthor().isBot()) return;

        String[] args = msg.getContentRaw().substring(Main.getPrefix().length()).split(" ");
        String command = args[0].toLowerCase();

        switch (command) {
            case "stats":
                int users = 0;
                for (Guild guild : Main.getJDA().getGuildCache()) {
                    users += guild.getMemberCount();
                }

                event.getMessage().reply(new EmbedBuilder()
                        .setTitle("AnythingMC Bot Stats")
                        .addField("Servers:",
                                String.valueOf(Main.getJDA().getGuildCache().size()),
                                false)
                        .addField("Users:",
                                String.valueOf(users),
                                false)
                        .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                        .build()).queue();
                break;
            case "github":
            case "repo":
            case "code":
                msg.reply(new EmbedBuilder()
                        .setTitle("AnythingMC Bot Repository")
                        .setDescription("You can check out the bots repository [here](https://github.com/Anything-Minecraft-Team/anythingmc-bot)")
                        .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                        .build()).queue();
                break;
            case "invite":
                msg.reply(new EmbedBuilder()
                        .setTitle("AnythingMC Bot Invite")
                        .setDescription("Discord invite soon:tm:")
                        .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                        .build()).queue();
                break;
            case "review":
                new ReviewCommand(args, event);
                break;
            case "changestatus":
                new ChangeStatusCommand(args, event);
                break;
            case "waitingapproval":
                new WaitingApprovalCommand(args, event);
                break;
            case "approve":
                new ApproveCommand(args, event);
                break;
        }
    }
}