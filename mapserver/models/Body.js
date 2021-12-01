const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BodySchema = new Schema({
        Name:{
            type: String
        }
})

const Body = mongoose.model("Body",BodySchema,"Body")
module.exports = {Body}