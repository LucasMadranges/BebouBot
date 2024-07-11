import {SlashCommandBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Répond avec Hello, world!");

export async function execute(interaction) {
    await interaction.reply("Hello, world!");
}
