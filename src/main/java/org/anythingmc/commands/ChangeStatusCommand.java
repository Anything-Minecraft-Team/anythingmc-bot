package org.anythingmc.commands;

import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;
import org.anythingmc.commands.api.DiscordCommand;

public class ChangeStatusCommand extends DiscordCommand {

    @Override
    public void onCommand(User author, Message message, TextChannel textChannel, String[] args) {
        if(!author.getId().equals("474482013886480385")) return;

        Main.getJDA().getPresence().setActivity(Activity.playing(String.join(" ", args)));
    }
}
