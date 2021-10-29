package org.anythingmc.commands;

import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;

public class ChangeStatusCommand {

    public ChangeStatusCommand(String[] args, MessageReceivedEvent event) {
        if(!event.getAuthor().getId().equals("474482013886480385")) return;

        Main.getJDA().getPresence().setActivity(Activity.playing(String.join(" ", args)));
    }
}
