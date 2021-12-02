const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NodeSchema = new Schema({
    x: {
        type: Float
    },
    y: {
        type: Float
    },
    z: {
        type: Float
    }
})

module.exports = mongoose.model("Node", NodeSchema)