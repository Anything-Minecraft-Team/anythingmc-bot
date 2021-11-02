package org.anythingmc.commands.api;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class CommandHandler {

    private final Map<String, DiscordCommand> commands = new HashMap<>();

    public void registerCommand(String prefix, String command, DiscordCommand commandExecutor) {
        commands.put(prefix + command, commandExecutor);
    }
}
