const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Column_DecorationSchema = new Schema({
        IDP:{
            type:Schema.Types.ObjectId,
            ref:"Polygon",
        },
        IDC:{
            type:Schema.Types.ObjectId,
            ref:"Column",
        },
        Name:{
            type: String
        }
})

const Column_Decoration = mongoose.model("Column_Decoration",Column_DecorationSchema,"Column_Decoration")
module.exports = {Column_Decoration}