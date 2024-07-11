import {SlashCommandBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("theotime")
    .setDescription("Répond avec Théotime est un gros gay!");

export async function execute(interaction) {
    await interaction.reply("Théotime est un gros gay!");
}
