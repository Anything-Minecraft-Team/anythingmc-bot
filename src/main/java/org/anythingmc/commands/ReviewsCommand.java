package org.anythingmc.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewsCommand {

    public ReviewsCommand(String[] args, MessageReceivedEvent event) {
        if(args.length >= 2) {

            if(args[1].equalsIgnoreCase("id")) {
                try {
                    ResultSet rs = Main.getDatabase().getStmt().executeQuery("SELECT * FROM reviews WHERE review_id='" + args[2] + "' AND awaiting_review='false'");

                    if (!rs.next()) {
                        event.getMessage().reply("No such review with the id " + args[2]).queue();
                        return;
                    }

                    User user = Main.getJDA().retrieveUserById(rs.getString("id")).complete();

                    EmbedBuilder embedBuilder = new EmbedBuilder()
                            .setAuthor(user.getName(), null, user.getAvatarUrl())
                            .addField("Review", rs.getString("review"), false)
                            .addField("Rating", String.valueOf(rs.getInt("rating")), false)
                            .setFooter("Id: " + rs.getString("review_id") + "\nHelp keep the bot running by donating! ko-fi.com/justdoom");
                    event.getTextChannel().sendMessage(embedBuilder.build()).queue();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            } else if(Main.getHosts().contains(args[1].toLowerCase())) {
                try {
                    ResultSet rs = Main.getDatabase().getStmt().executeQuery("SELECT *, MIN(review_id) FROM reviews WHERE host='" + args[1].toLowerCase() + "' AND awaiting_review='false'");

                    if (!rs.next()) {
                        event.getMessage().reply("No reviews for the host " + args[1] + " :(").queue();
                        return;
                    }

                    User user = Main.getJDA().retrieveUserById(rs.getString("id")).complete();

                    EmbedBuilder embedBuilder = new EmbedBuilder()
                            .setAuthor(user.getName(), null, user.getAvatarUrl())
                            .addField("Review", rs.getString("review"), false)
                            .addField("Rating", String.valueOf(rs.getInt("rating")), false)
                            .setFooter("Id: " + rs.getString("review_id") + "\nHelp keep the bot running by donating! ko-fi.com/justdoom");
                    event.getTextChannel().sendMessage(embedBuilder.build()).queue();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            } else {
                event.getMessage().reply("No host found").queue();
            }
        }
    }
}
