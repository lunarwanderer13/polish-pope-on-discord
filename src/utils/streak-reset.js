const fs = require("fs")
const schedule = require("node-schedule")

schedule.scheduleJob("30 21 * * *", () => {
    let now = new Date()
    now = now.toISOString().split("T")[0]
    const data = JSON.parse(fs.readFileSync("src/logs/pope.json"))

    for (user of data) {
        if (user.last_pope !== now) {
            user.popes_in_a_row = 0
        }
    }

    fs.writeFileSync("src/logs/pope.json", JSON.stringify(data, null, 4))
})