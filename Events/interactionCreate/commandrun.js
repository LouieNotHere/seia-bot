const chalk = require('chalk')

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
  
    if (!command) {
        console.error(`${chalk.red('[ERROR]')} There Are No Command Fits The Name As ${interaction.commandName}`);
        return;
    }
  
    try {
        command.execute(interaction);
    } catch (error) {
        console.error(`${chalk.redBright('[ERROR] ')} ${error.toString()}`);
    }

    if (!interaction.isButton()) return;
    if (!interaction.isStringSelectMenu()) return;
    if (!interaction.isModalSubmit()) return
    // console.log(interaction)
}
