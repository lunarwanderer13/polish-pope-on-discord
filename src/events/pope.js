import { AttachmentBuilder } from "discord.js"
import fs from "fs"
import "dotenv/config"

export const name = "messageCreate"
export const once = false
export function execute(message) {
    const kremufki = [
        "src\\images\\kremufka1.png",
        "src\\images\\kremufka2.png",
        "src\\images\\kremufka3.png",
        "src\\images\\kremufka4.png"
    ]

    let now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    now = now.toISOString().split("T")[0]

    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday = yesterday.toISOString().split("T")[0]

    const pope_list = JSON.parse(fs.readFileSync("src/logs/pope.json"))

    if (message.content === "2137" && hours === 21 && minutes === 37) {
        const entry = pope_list.find(e => e.id === message.author.id)

        if (!entry) {
            entry = {
                id: message.author.id,
                popes: 0,
                popes_in_a_row: 0,
                last_pope: now
            }

            pope_list.push(entry)
        }

        if (entry.last_pope !== now || entry.popes === 0) {
            entry.popes++
            entry.last_pope === yesterday ? entry.popes_in_a_row++ : entry.popes_in_a_row = 0
            entry.last_pope = now

            let reply_message = `${message.author} to twoja ${entry.popes} papieżowa, `
            if (entry.popes_in_a_row > 1) reply_message += `już ${entry.popes_in_a_row} z rzędu, `
            reply_message += `trzymaj kremówkę! <:kremuuuuufkuuuj_z_tyyyyyym_:1435705908167708743>`

            const attachment = new AttachmentBuilder(kremufki[Math.floor(Math.random() * kremufki.length)], { name: "kremufka.png" })

            message.reply({
                content: reply_message,
                files: [attachment]
            })
        } else {
            message.reply(`${message.author} nieco za szybko piszesz tą godzine, może poczekaj do jutra co?`)
        }

        fs.writeFileSync("src/logs/pope.json", JSON.stringify(pope_list, null, 4))
    }
}