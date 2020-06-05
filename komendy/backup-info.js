const Discord = require("discord.js");
const zapis = require("discord-backup");

module.exports = {
    name: "backup-info",

    run: async (client, message, args) => {

let zapisid = args[0];
if(!zapisid){
    return message.channel.send("Podaj id zapisu");
}

zapis.fetch(zapisid).then((infozapis) => {
    const utworzenie = new Date(infozapis.data.createdTimestamp);
    const yyyy = utworzenie.getFullYear().toString(), mm = (utworzenie.getMonth()+1).toString(), dd = utworzenie.getDate().toString();
    const data = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
    let embed = new Discord.MessageEmbed()
        .setTitle("Informacje o zapisie")      
        .addFields(
            { name: "ID Serwera", value: infozapis.data.id },
            { name: "Nazwa Serwera", value: infozapis.data.name, },
            { name: "Zapis utworzono", value: data },
        )
        .setColor("RANDOM");
    message.channel.send(embed);
}).catch((err) => {

    return message.channel.send("Nie znaleziono takiego zapisu: `"+zapisid+"`!");
});
    } }

