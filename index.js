const {Client, GatewayIntentBits, Message} = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

client.once("ready", () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const {commandName} = interaction;

    if (commandName === "ping") {
        await interaction.reply("Pong!");
    } else if (commandName === "hello") {
        await interaction.reply("Hello, world!");
    } else if (commandName === "theotime") {
        await interaction.reply("Théotime est un gros gay!");
    }
});

client.login(TOKEN).catch(error => {
    console.error("Erreur de connexion :", error);
});
