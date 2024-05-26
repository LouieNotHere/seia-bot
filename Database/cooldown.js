const { model, Schema } = require('mongoose')

let cdSchema = new Schema({
    UserID: String,
    CheckAlive: String,
})

module.exports = model('Cooldown', cdSchema)
