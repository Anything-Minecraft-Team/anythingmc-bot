package org.anythingmc.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.Main;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

public class ReviewCommand {

    public ReviewCommand(String[] args, MessageReceivedEvent event) {
        /**
         * Host select
         */

        Message msg = event.getMessage();

        if(event.getGuild().getSelfMember().hasPermission(Permission.MESSAGE_MANAGE)) msg.delete().queue();
        EmbedBuilder embedBuilder = new EmbedBuilder();
        event.getTextChannel().sendMessage(embedBuilder
                .setTitle("AnythingMC Bot Review")
                .setDescription("Which hosting provider would you like to review?\nYou can find a list [here](https://anythingmc.org). You have one minute to respond")
                .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                .build()).queue(message -> Main.getEventWaiter().waitForEvent( // Setup Wait action once message was send
                        MessageReceivedEvent.class,
                        e -> {
                            if (!e.getChannel().getId().equals(event.getTextChannel().getId())) // Check that channel is the same
                                return false;

                            return e.getAuthor().getIdLong() == event.getAuthor().getIdLong(); // Check for same author
                        },
                        e -> {
                            if (!Main.getHosts().contains(e.getMessage().getContentRaw().toLowerCase())) {
                                message.editMessage("That host has not been added :(").queue();
                                message.suppressEmbeds(true).queue();
                                return;
                            }

                            try {
                                ResultSet resultSet = Main.getDatabase().getStmt().executeQuery(
                                        "SELECT * FROM reviews WHERE id='" + msg.getAuthor().getId() + "' AND host='" + e.getMessage().getContentRaw().toLowerCase() + "'");
                                if(resultSet.next()) {
                                    message.suppressEmbeds(true).queue();
                                    message.editMessage("You already have a review for this host. Please edit or remove it instead.").queue();
                                    return;
                                }

                                /**
                                 * User review
                                 */
                                if(event.getGuild().getSelfMember().hasPermission(Permission.MESSAGE_MANAGE)) msg.delete().queue();
                            } catch (SQLException ex) {
                                ex.printStackTrace();
                                message.suppressEmbeds(true).queue();
                                message.editMessage("Sorry, there was an error").queue();
                                return;
                            }
                            message.editMessage(embedBuilder
                                    .setTitle("AnythingMC Bot Review")
                                    .setDescription("You may now write your review. You have ten minutes and a 1024 character limit.")
                                    .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                                    .build()).queue(message1 -> Main.getEventWaiter().waitForEvent( // Setup Wait action once message was send
                                            MessageReceivedEvent.class,
                                            e1 -> {
                                                if (!e1.getChannel().getId().equals(event.getTextChannel().getId())) // Check that channel is the same
                                                    return false;

                                                return e1.getAuthor().getIdLong() == event.getAuthor().getIdLong(); // Check for same author
                                            },
                                            e1 -> {
                                                /**
                                                 * Is this correct
                                                 */
                                                if(event.getGuild().getSelfMember().hasPermission(Permission.MESSAGE_MANAGE)) msg.delete().queue();
                                                message.editMessage(embedBuilder
                                                        .setTitle("AnythingMC Bot Review")
                                                        .setDescription("Is this correct?\n\"" + e1.getMessage().getContentRaw() + "\"\nYes/Y or No/N")
                                                        .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                                                        .build()).queue(message2 -> Main.getEventWaiter().waitForEvent( // Setup Wait action once message was send
                                                                MessageReceivedEvent.class,
                                                                e2 -> {
                                                                    if (!e.getChannel().getId().equals(event.getTextChannel().getId())) // Check that channel is the same
                                                                        return false;

                                                                    return e.getAuthor().getIdLong() == event.getAuthor().getIdLong(); // Check for same author
                                                                },
                                                                e2 -> {
                                                                    /**
                                                                     * Stars review
                                                                     */
                                                                    if(event.getGuild().getSelfMember().hasPermission(Permission.MESSAGE_MANAGE)) msg.delete().queue();
                                                                    switch (e2.getMessage().getContentRaw().toLowerCase()) {
                                                                        case "yes":
                                                                        case "y":
                                                                            message.editMessage(embedBuilder
                                                                                    .setTitle("AnythingMC Bot Review")
                                                                                    .setDescription("How many stars do you rate this host? 1-5 stars. You have 1 minute.")
                                                                                    .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                                                                                    .build()).queue(message3 -> Main.getEventWaiter().waitForEvent( // Setup Wait action once message was send
                                                                                    MessageReceivedEvent.class,
                                                                                    e3 -> {
                                                                                        if (!e.getChannel().getId().equals(event.getTextChannel().getId())) // Check that channel is the same
                                                                                            return false;

                                                                                        return e.getAuthor().getIdLong() == event.getAuthor().getIdLong(); // Check for same author
                                                                                    },
                                                                                    e3 -> {

                                                                                        /**
                                                                                         * Review submitted
                                                                                         */
                                                                                        if(event.getGuild().getSelfMember().hasPermission(Permission.MESSAGE_MANAGE)) msg.delete().queue();
                                                                                        if (e3.getMessage().getContentRaw().equalsIgnoreCase("1")
                                                                                                || e3.getMessage().getContentRaw().equalsIgnoreCase("2")
                                                                                                || e3.getMessage().getContentRaw().equalsIgnoreCase("3")
                                                                                                || e3.getMessage().getContentRaw().equalsIgnoreCase("4")
                                                                                                || e3.getMessage().getContentRaw().equalsIgnoreCase("5")) {

                                                                                            try {
                                                                                                ResultSet resultSet = Main.getDatabase().getStmt().executeQuery(
                                                                                                        "SELECT MAX(review_id) AS maxid FROM reviews");
                                                                                                resultSet.next();

                                                                                                Main.getDatabase().getStmt().executeUpdate(
                                                                                                        "INSERT INTO reviews (id, review_id, rating, review, host, awaiting_review) VALUES (\"" + msg.getAuthor().getId() +
                                                                                                                "\", \"" +(resultSet.getInt("maxid") + 1) + "\", " + Integer.valueOf(e3.getMessage().getContentRaw()) + ", \"" + e1.getMessage().getContentRaw() +
                                                                                                                "\", \"" + e.getMessage().getContentRaw().toLowerCase() + "\", \"true\")");
                                                                                            } catch (SQLException ex) {
                                                                                                message.suppressEmbeds(true).queue();
                                                                                                message.editMessage("There was an error submitting this review, sorry").queue();
                                                                                                ex.printStackTrace();
                                                                                                return;
                                                                                            }

                                                                                            message.editMessage(embedBuilder
                                                                                                    .setTitle("AnythingMC Bot Review")
                                                                                                    .setDescription("Your review has been submitted. You sill receive a message when it has been accepted unless your messages are off")
                                                                                                    .setFooter("Help keep the bot running by donating! ko-fi.com/justdoom")
                                                                                                    .build()).queue();
                                                                                        } else {
                                                                                            message.editMessage("That is not a valid number you can use").queue();
                                                                                            message.suppressEmbeds(true).queue();
                                                                                        }
                                                                                    },
                                                                                    1, TimeUnit.MINUTES,
                                                                                    () -> {
                                                                                        message.editMessage("You didn't respond in time!").queue();
                                                                                        message.suppressEmbeds(true).queue();
                                                                                    }
                                                                            ));
                                                                            break;
                                                                        case "no":
                                                                        case "n":
                                                                            message.editMessage("Sad").queue();
                                                                            message.suppressEmbeds(true).queue();
                                                                            break;
                                                                    }
                                                                },
                                                                1, TimeUnit.MINUTES,
                                                                () -> message.editMessage("You didn't respond in time!").queue()
                                                        )
                                                );
                                            },
                                            10, TimeUnit.MINUTES,
                                            () -> message.editMessage("You didn't respond in time!").queue()
                                    )
                            );
                        },
                        1, TimeUnit.MINUTES,
                        () -> message.editMessage("You didn't respond in time!").queue()
                )
        );
    }
}
