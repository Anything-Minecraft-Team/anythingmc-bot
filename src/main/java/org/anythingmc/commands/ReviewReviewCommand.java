package org.anythingmc.commands;

import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewReviewCommand {

    public ReviewReviewCommand(String[] args, MessageReceivedEvent event) {
        if(!event.getAuthor().getId().equals("474482013886480385")) return;

        //"SELECT MIN(review_id) AS minid FROM reviews WHERE awaiting_review='true'"

        try {
            ResultSet resultSet = Main.getDatabase().getStmt().executeQuery(
                    "SELECT * FROM reviews WHERE awaiting_review='true'");

            int waiting = 0;

            while(resultSet.next()) {
                waiting++;
            }

            event.getTextChannel().sendMessage(waiting + " reviews waiting approval").queue();
            resultSet.next();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
