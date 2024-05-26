const { ActivityType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout
const mongoose = require('mongoose')
const chalk = require('chalk')
const mongodbURL = process.env.MONGO_URL;


module.exports = async (client) => {
    if (!mongodbURL) return;
    await mongoose.connect(mongodbURL || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    if (mongoose.connect) {
        console.log(chalk.blue('[LOG]') + ' Database, Check!')
    }

    var i = 0
    const namearr = [
        'v0.1 - Yurizono Seia, Prepare To Run!',
        'Testing Mode... Nothing So Much To Say...',
    ]
    while (i !== -1) {
        await client.user.setPresence({
            activities: [{
                name: `${namearr[i]}`,
                type: ActivityType.Playing,
            }],
            status: 'online',
        })
        await wait(20000)
        i++
        if (i === 2)
            i = 0
    }
}