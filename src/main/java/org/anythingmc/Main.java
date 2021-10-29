package org.anythingmc;

import com.google.gson.Gson;
import com.jagrosh.jdautilities.commons.waiter.EventWaiter;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.events.GenericEvent;
import net.dv8tion.jda.api.events.ReadyEvent;
import net.dv8tion.jda.api.hooks.EventListener;
import org.anythingmc.commands.CommandHandler;
import org.anythingmc.config.Config;
import org.anythingmc.database.Database;

import javax.security.auth.login.LoginException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

public class Main implements EventListener {

    public static Gson gson = new Gson();
    public static Config config;
    private static JDA jda;
    private static JDABuilder builder;
    private static EventWaiter waiter;
    private static Database database;

    private static final String prefix = "!";

    private static final ArrayList<String> hosts = new ArrayList<>(Arrays.asList("titannodes", "birdflop", "bloom",
            "apexhosting", "mcprohosting", "mchostingpro", "shockbyte", "forestracks", "pebblehost", "dedicatedmc"));

    public static void main(String[] args) throws LoginException, IOException, SQLException {

        String data = Files.readString(Path.of("config.json"));
        config = gson.fromJson(data, Config.class);

        database = new Database(config.host, config.password, config.user, config.port, config.database);

        waiter = new EventWaiter();

        builder = JDABuilder.createDefault(config.token)
                .addEventListeners(new CommandHandler(), waiter);

        jda = builder.build();

        jda.getPresence().setActivity(Activity.playing("anythingmc.org"));

        //jda.upsertCommand("ping", "Calculate ping of the bot").queue();
    }

    @Override
    public void onEvent(GenericEvent event) {
        if (event instanceof ReadyEvent) {
            try {
                jda = getBuilder().setActivity(Activity.watching("over " + jda.getGuildCache().size() + " servers")).build();
            } catch (LoginException e) {
                e.printStackTrace();
            }
        }
    }

    public static EventWaiter getEventWaiter() {
        return waiter;
    }

    public static String getPrefix() {
        return prefix;
    }

    public static JDA getJDA() {
        return jda;
    }

    public static void setJDA(JDA jdas) {
        jda = jdas;
    }

    public static JDABuilder getBuilder() {
        return builder;
    }

    public static Database getDatabase() {
        return database;
    }

    public static ArrayList<String> getHosts() {
        return hosts;
    }
}
