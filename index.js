const { Client, GatewayIntentBits, Partials } = require('discord.js');
const dotenv = require("dotenv");

dotenv.config();
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent],
    partials: [Partials.Channel],
});

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {
    // Ignore les messages du bot lui-même
    if (message.author.bot) return;

    // Si le message est "!ping"
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

client.on('messageCreate', message => {
    // Ignore les messages du bot lui-même
    if (message.author.bot) return;

    // Si le message est "!ping"
    if (message.content === '!theotime') {
        message.channel.send('Théotime est un gros gay!');
        message.channel.send(`N'est-ce pas <@1052117306081284128>`);
    }
});

client.login(TOKEN).catch(error => {
    console.error('Erreur de connexion :', error);
});
