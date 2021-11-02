package org.anythingmc.commands;

import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;
import org.anythingmc.commands.api.DiscordCommand;

public class DatabaseCommand extends DiscordCommand {

    @Override
    public void onCommand(User author, Message message, TextChannel textChannel, String[] args) {
        if(!author.getId().equals("474482013886480385")) return;

        message.reply("It works!").queue();
    }
}