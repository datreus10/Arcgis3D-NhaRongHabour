const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BodySchema = new Schema({
    Name: {
        type: String
    }
})

module.exports = mongoose.model("Body", BodySchema)