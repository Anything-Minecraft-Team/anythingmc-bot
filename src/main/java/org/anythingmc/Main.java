package org.anythingmc;

import com.google.gson.Gson;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.events.GenericEvent;
import net.dv8tion.jda.api.events.ReadyEvent;
import net.dv8tion.jda.api.hooks.EventListener;
import org.anythingmc.commands.ReviewCommand;
import org.anythingmc.config.Config;

import javax.security.auth.login.LoginException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main implements EventListener {

    public static Gson gson = new Gson();
    public static Config config;
    private static JDA jda;
    private static JDABuilder builder;

    private static String prefix = "!";

    public static void main(String[] args) throws LoginException, IOException {

        String data = Files.readString(Path.of("config.json"));
        config = gson.fromJson(data, Config.class);

        builder = JDABuilder.createDefault(config.token)
                .addEventListeners(new ReviewCommand());

        jda = builder.build();


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
}
