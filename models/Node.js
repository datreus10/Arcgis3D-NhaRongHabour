const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NodeSchema = new Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    z: {
        type: Number
    }
})


const Node = mongoose.model("Node",NodeSchema,"Node")
module.exports = {Node}