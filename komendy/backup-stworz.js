const Discord = require("discord.js");
const zapis = require("discord-backup");

module.exports = {
    name: "backup-stworz",

    run: async (client, message, args) => {
        
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send("Brak permisji Administrator");
        }
    
        zapis.create(message.guild,  {
            jsonBeautify: true
        }).then((zapis) => {
            message.author.send(" Utworzono zapis, aby go wczytac wpisz `!backup-wczytaj "+zapis.id+"`");
            message.channel.send("Utworzono zapis kanałów!");
        });
    } } 