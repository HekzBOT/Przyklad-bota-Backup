const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

["handler"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});
const lista = [
    "github.com/orgs/HekzBOT", 
    "!pomoc",
    "Miłego dnia!"
    ]; 

client.on('ready', () => {
    setInterval(() => {
        const array = Math.floor(Math.random() * (lista.length - 1) + 1); 
        client.user.setActivity(`${lista[array]}`, {
            type: "STREAMING",
            url: "https://www.twitch.tv/hekzbot"
          });
    }, 10000); 
    console.log(`\x1b[93;41m`, `Zalogowano jako ${client.user.username} `);
});


client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.login(process.env.TOKEN);