import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { Pagination } from "pagination.djs"
import fs from "fs"

export const data = new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Zobacz kto lubi kremówki najbardziej!")

export async function execute(interaction) {
    const pope_list = JSON.parse(fs.readFileSync("src/logs/pope.json"))

    const popes_array = [...pope_list].sort((a, b) => b.popes - a.popes)
    const popes_row_array = [...popes_array].sort((a, b) => b.popes_in_a_row - a.popes_in_a_row)

    let top_popes = ""
    let top_popes_row = ""

    for (let i = 0; i < 5; i++) {
        if (i >= pope_list.length) break

        let member_popes = await interaction.guild.members.fetch(popes_array[i].id)
        top_popes += `**${i + 1}**. \`${member_popes.displayName}\`\n`

        let member_popes_row = await interaction.guild.members.fetch(popes_row_array[i].id)
        top_popes_row += `**${i + 1}**. \`${member_popes_row.displayName}\`\n`
    }

    new Pagination(interaction)
        .setTitle("Tablica kremówkowych wyników")
        .setColor("#69bccd")

        .setFields([
            {
                name: "Top 5 kremówek",
                value: top_popes,
                inline: true
            },
            {
                name: "Top 5 streak",
                value: top_popes_row,
                inline: true
            }
        ])

        .paginateFields()
        .render()
}