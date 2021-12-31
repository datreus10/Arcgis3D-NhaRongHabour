const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColumnSchema = new Schema({
        IDP:{
            type:Schema.Types.ObjectId,
            ref:"Polygon",
        },
        IDFL:{
            type:Schema.Types.ObjectId,
            ref:"Floor",
        },
        Name:{
            type: String
        }
})

const Column = mongoose.model("Column",ColumnSchema,"Column")
module.exports = {Column}