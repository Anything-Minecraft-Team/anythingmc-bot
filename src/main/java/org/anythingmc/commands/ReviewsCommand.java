package org.anythingmc.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;
import org.anythingmc.commands.api.DiscordCommand;
import org.anythingmc.util.ReviewUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewsCommand extends DiscordCommand {

    @Override
    public void onCommand(User author, Message message, TextChannel textChannel, String[] args) {
        if(args.length >= 2) {

            if(args[1].equalsIgnoreCase("id")) {
                try {
                    ResultSet rs = Main.getDatabase().getStmt().executeQuery("SELECT * FROM reviews WHERE review_id='" + args[2] + "' AND awaiting_review='false'");

                    if (!rs.next()) {
                        message.reply("No such review with the id " + args[2]).queue();
                        return;
                    }

                    User user = Main.getJDA().retrieveUserById(rs.getString("id")).complete();

                    EmbedBuilder embedBuilder = new EmbedBuilder()
                            .setAuthor(user.getName(), null, user.getAvatarUrl())
                            .setTitle(rs.getString("host") + "'s review")
                            .addField("Review", rs.getString("review"), false)
                            .addField("Rating", ReviewUtil.getStars(String.valueOf(rs.getInt("rating"))), false)
                            .setFooter("Id: " + rs.getString("review_id") + "\nHelp keep the bot running by donating! ko-fi.com/justdoom");
                    textChannel.sendMessage(embedBuilder.build()).queue();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            } else if(Main.getHosts().contains(args[1].toLowerCase())) {
                try {
                    ResultSet rs = Main.getDatabase().getStmt().executeQuery("SELECT *, MIN(review_id) FROM reviews WHERE host='" + args[1].toLowerCase() + "' AND awaiting_review='false'");

                    if (!rs.next()) {
                        message.reply("No reviews for the host " + args[1] + " :(").queue();
                        return;
                    }

                    User user = Main.getJDA().retrieveUserById(rs.getString("id")).complete();

                    EmbedBuilder embedBuilder = new EmbedBuilder()
                            .setAuthor(user.getName(), null, user.getAvatarUrl())
                            .setTitle(rs.getString("host") + "'s Review #")
                            .addField("Review", rs.getString("review"), false)
                            .addField("Rating", ReviewUtil.getStars(String.valueOf(rs.getInt("rating"))), false)
                            .setFooter("Id: " + rs.getString("review_id") + "\nHelp keep the bot running by donating! ko-fi.com/justdoom");
                    textChannel.sendMessage(embedBuilder.build()).queue();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            } else {
                message.reply("No host found").queue();
            }
        }
    }
}
