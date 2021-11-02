package org.anythingmc.commands;

import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;
import org.anythingmc.Main;
import org.anythingmc.commands.api.DiscordCommand;

import java.sql.SQLException;

public class ApproveCommand extends DiscordCommand {

    @Override
    public void onCommand(User author, Message message, TextChannel textChannel, String[] args) {
        try {
            Main.getDatabase().getStmt().executeUpdate("UPDATE reviews SET awaiting_review = 'false' WHERE review_id='" + args[1] + "'");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        message.reply("The review " + args[1] + " has been approved.").queue();
    }
}
