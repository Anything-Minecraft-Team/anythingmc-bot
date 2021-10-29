package org.anythingmc.commands;

import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;

import java.sql.SQLException;

public class ApproveCommand {

    public ApproveCommand(String[] args, MessageReceivedEvent event) {
        try {
            Main.getDatabase().getStmt().executeUpdate("UPDATE reviews SET awaiting_review = 'false' WHERE review_id='" + args[1] + "'");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        event.getMessage().reply("The review " + args[1] + " has been approved.").queue();
    }
}
