package org.anythingmc.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;
import org.anythingmc.commands.api.DiscordCommand;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PendingApprovalCommand extends DiscordCommand {

    @Override
    public void onCommand(User author, Message message, TextChannel textChannel, String[] args) {
        if(!author.getId().equals("474482013886480385")) return;

        try {
            ResultSet resultSet = Main.getDatabase().getStmt().executeQuery(
                    "SELECT * FROM reviews WHERE awaiting_review='true'");

            int waiting = 0;

            while(resultSet.next()) {
                waiting++;
            }

            textChannel.sendMessage(waiting + " reviews pending approval").queue();
            resultSet.next();

            ResultSet resultSet1 = Main.getDatabase().getStmt().executeQuery(
                    "SELECT *, MIN(review_id) FROM reviews WHERE awaiting_review='true'");

            resultSet1.next();

            User user = Main.getJDA().retrieveUserById(resultSet1.getString("id")).complete();

            EmbedBuilder embedBuilder = new EmbedBuilder()
                    .setAuthor(user.getName(), null, user.getAvatarUrl())
                    .addField("Review", resultSet1.getString("review"), false)
                    .addField("Rating", String.valueOf(resultSet1.getInt("rating")), false)
                    .setFooter("Id: " + resultSet1.getString("review_id") + "\nHelp keep the bot running by donating! ko-fi.com/justdoom");
            textChannel.sendMessage(embedBuilder.build()).queue();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
