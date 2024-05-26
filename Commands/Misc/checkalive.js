const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk')

const cdSchema = require('../../Database/cooldown')
const FooterEmbeds = require('../../Utils/embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkalive')
        .setDescription('Check The Bot\'s Status In Server'),
    async execute(interaction) {
        const iuser = await interaction.guild.members.fetch(interaction.user.id)

        await interaction.deferReply()
        const cdtime = 5000

        cdSchema.findOne({ UserID: interaction.user.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                cdSchema.create({
                    UserID: interaction.user.id,
                    CheckAlive: Date.now()
                })
                await interaction.editReply('<:seiaconcerned:1244129048494473246> Well, Since You Haven\'t In Cooldown Database Yet... Now You Can Try Again') 
            } else {
                const cduser = data.UserID
                const CDTime = data.CheckAlive
                console.log(chalk.yellow('[Command: Checkalive]') + ` ${cduser}, ${CDTime}, ${Date.now()}`)

                let totalSeconds = (interaction.client.uptime / 1000)
                let days = Math.floor(totalSeconds / 86400)
                totalSeconds %= 86400
                let hours = Math.floor(totalSeconds / 3600)
                totalSeconds %= 3600
                let minutes = Math.floor(totalSeconds / 60)
                let seconds = Math.floor(totalSeconds % 60)
                if (minutes < 10) {
                    minutes = `0${minutes}`
                }
                if (seconds < 10) {
                    seconds = `0${seconds}`
                }

                const embed = new EmbedBuilder()
                    .setColor('White')
                    .setTitle(`<:seiaconcerned:1244129048494473246> **Checking some info of the discord bot in the server...**`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                    .setDescription(`> Server: **${interaction.guild.name}**\n\n> Ping: **${interaction.client.ws.ping}**ms\n> Uptime: **${days}**d **${hours}**h **${minutes}**m **${seconds}**s`)
                    .setTimestamp(Date.now())
                    .setFooter({ text: `${FooterEmbeds[0][0]}`, iconURL: `${FooterEmbeds[1][Math.floor(Math.random() * FooterEmbeds[1].length)]}` })
                
                if (CDTime > Date.now()) {
                    const cdembed = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`**Command - Cooldown**`)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${iuser.displayAvatarURL({ dynamic: true, size: 512 })}` })
                        .setDescription(` <:seiaconcerned:1244129048494473246> | ${interaction.user} Hey, You Have To Wait <t:${Math.round(CDTime / 1000)}> (<t:${Math.round(CDTime / 1000)}:R>) To Use The Command!`)
                        .setTimestamp()
                        .setFooter({ text: `${FooterEmbeds[0][0]}`, iconURL: `${FooterEmbeds[1][Math.floor(Math.random() * FooterEmbeds[1].length)]}` })
                    await interaction.editReply({
                        embeds: [cdembed]
                    })
                }
                else {
                    data.CDPing = Date.now() + cdtime
                    data.save()
                    await interaction.editReply({ embeds: [embed] })
                }
            }
        })
    }
}
