const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("");
table.setHeading("komendy", "Nazwa komendy", "Status");

module.exports = (client) => {
        const commands = readdirSync(`./komendy/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../komendy/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file,pull.name, `✅ Poprawnie załadowano`);
            } else {
                table.addRow(file, "Brak", `❌ Brak nazwy komendy`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
 
        }

    
    console.log('\x1b[31m',table.toString());
}
