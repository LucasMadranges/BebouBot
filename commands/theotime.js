const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("theotime")
        .setDescription("Répond avec Théotime est un gros gay!"),
    async execute(interaction) {
        await interaction.reply("Théotime est un gros gay!");
    },
};
