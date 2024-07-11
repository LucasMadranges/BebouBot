import {REST, Routes} from "discord.js";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {config} from "dotenv";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] La commande dans ${file} est incorrecte et n'a pas de propriété 'data' ou 'execute'.`);
    }
}

const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Enregistrement des commandes slash.");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands},
        );

        console.log("Commandes slash enregistrées avec succès.");
        process.exit(0); // Succès
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des commandes slash:", error);
        process.exit(1); // Erreur
    }
})();
