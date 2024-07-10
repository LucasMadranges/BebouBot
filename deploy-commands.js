const {REST, Routes} = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
    {
        name: "ping",
        description: "Répond avec Pong!",
    }, {
        name: "hello",
        description: "Répond avec Hello, world!",
    }, {
        name: "theotime",
        description: "Répond avec Théotime est un gros gay!",
    },
];

const rest = new REST({version: "10"}).setToken(TOKEN);

(async () => {
    try {
        console.log("Enregistrement des commandes slash.");

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands},
        );

        console.log("Commandes slash enregistrées avec succès.");
        process.exit(0); // Succès
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des commandes slash:", error);
        process.exit(1); // Erreur
    }
})();
