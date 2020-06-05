const Discord = require("discord.js");
const zapis = require("discord-backup");

module.exports = {
    name: "backup-zaladuj",

    run: async (client, message, args) => {

 if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("Nie posiadasz permisji Administrator");
}
let idzapisu = args[0];
if(!idzapisu){
    return message.channel.send("Podaj id zapisu");
}
zapis.fetch(idzapisu).then(async () => {
    message.channel.send("Uwaga! wszystkie kanały,role,emotki,kategorie zostaną usunięte i zastąpione tymi z zapisu aby potwierdzic wczytanie zapisu wpisz `potwierdz` !");
        await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "potwierdz"), {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).catch((err) => {
          
            return message.channel.send("Czas upłynął, anulowanie wczytania zapisu!");
        });

        message.author.send("Ładowanie zapisu...");
  
        zapis.load(idzapisu, message.guild).then(() => {
         
            zapis.remove(idzapisu);
        }).catch((err) => {
           
            return message.author.send("Błąd! Sprawdz czy bot posiada permisjie Administratora");
        });
}).catch((err) => {
    
    return message.channel.send("Nie znaleziono zapisu z id `"+idzapisu+"`!");
});
} }
