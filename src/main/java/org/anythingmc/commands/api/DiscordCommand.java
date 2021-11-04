package org.anythingmc.commands.api;

import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;

public abstract class DiscordCommand {

    public abstract void onCommand(User author, Message message, TextChannel textChannel, String[] args);
}