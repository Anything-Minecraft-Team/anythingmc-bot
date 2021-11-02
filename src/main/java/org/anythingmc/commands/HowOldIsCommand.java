package org.anythingmc.commands;

import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import org.anythingmc.commands.api.DiscordCommand;

import java.util.*;

public class HowOldIsCommand extends DiscordCommand {

    // Date from google minus 86400
    private final LinkedHashMap<String, Long> versions = new LinkedHashMap<>(){{
        put("minecraft", 1242432000L);
        put("a1.0.0", 1277769600L);
        put("a1.2.6", 1291334400L);
        put("b1.0", 1292716800L);
        put("b1.0.0", 1292716800L);
        put("b1.7.3", 1309910400L);
        put("b1.8.1", 1315958400L);
        put("1.0.0", 1321488000L);
        put("1.4.2", 1351036800L);
        put("1.5.2", 1367366400L);
        put("1.6.4", 1379462400L);
        put("1.7.10", 1403654400L);
        put("1.8.8", 1437955200L);
        put("1.12.2", 1505606400L);
        put("1.16", 1592784000L);
        put("1.16.1", 1592870400L);
        put("1.16.2", 1597017600L);
        put("1.16.3", 1599609600L);
        put("1.16.4", 1604188800L);
        put("1.16.5", 1610582400L);
        put("1.17", 1623024000L);
        put("1.17.1", 1625443200L);
    }};

    @Override
    public void onCommand(User author, Message message, TextChannel textChannel, String[] args) {

        if(args.length < 2) return;

        String version = args[1];

        if(version.equalsIgnoreCase("list")) {
            StringBuilder vers = new StringBuilder();
            for (String key : versions.keySet()) vers.append(key).append(", ");
            
            message.reply("The added versions are...\n" + vers.substring(0, vers.length() - 2)).queue();
            return;
        }

        if(version.equalsIgnoreCase("compare")) {
            String version1 = args[2];
            String version2 = args[3];

            if(!versions.containsKey(version1)) {
                textChannel.sendMessage("The version " + version1 + " is not currently added, sorry :(").queue();
                return;
            }

            if(!versions.containsKey(version2)) {
                textChannel.sendMessage("The version " + version2 + " is not currently added, sorry :(").queue();
                return;
            }

            // Credit to https://howoldisminecraft188.today/ for the maths, sorry
            long release = versions.get(version1) * 1000;
            long now = versions.get(version2) * 1000;
            long diff = Math.abs(now - release) / (1000 * 60 * 60 * 24); // in days

            int years = (int) Math.round(diff / 365.256363004);
            int days = (int) Math.round(diff % 365.256363004);
            int months = (int) Math.round(days / 30.438);

            String month, day;
            days = days % 30;

            if (months > 0) {
                month = months + " month" + (months > 1 ? "s" : "");
                if (days == 0) {
                    month = ", and " + month;
                } else {
                    month = ", " + month;
                }
            } else {
                month = "";
            }

            if (days > 0) {
                day = ", and " + days + " day" + (days > 1 ? "s" : "");
            } else {
                day = "";
            }

            textChannel.sendMessage("There is a " + years + " years" + month + day + " difference between these versions.\n(" + diff + " days)").queue();
            return;
        }

        if(!versions.containsKey(version)) {
            textChannel.sendMessage("That version is not currently added, sorry :(").queue();
            return;
        }

        // Credit to https://howoldisminecraft188.today/ for the maths, sorry
        long release = versions.get(version) * 1000;
        Date now = new Date();
        long diff = (now.getTime() - release) / (1000 * 60 * 60 * 24); // in days

        int years = (int) Math.round(diff / 365.256363004);
        int days = (int) Math.round(diff % 365.256363004);
        int months = (int) Math.round(days / 30.438);

        String month, day;
        days = days % 30;

        if (months > 0) {
            month = months + " month" + (months > 1 ? "s" : "");
            if (days == 0) {
                month = ", and " + month;
            } else {
                month = ", " + month;
            }
        } else {
            month = "";
        }

        if (days > 0) {
            day = ", and " + days + " day" + (days > 1 ? "s" : "");
        } else {
            day = "";
        }

        textChannel.sendMessage("Minecraft " + version + " is " + years + " years" + month + day + " old today.\n(" + diff + " days)").queue();
    }
}
