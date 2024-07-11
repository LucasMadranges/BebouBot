import {Client, Collection, GatewayIntentBits} from "discord.js";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {config} from "dotenv";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] La commande dans ${file} est incorrecte et n'a pas de propriété 'data' ou 'execute'.`);
    }
}

client.once("ready", () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "Il y a eu une erreur lors de l'exécution de cette commande!",
            ephemeral: true,
        });
    }
});

client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error("Erreur de connexion :", error);
});
