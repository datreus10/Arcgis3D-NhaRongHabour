const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Roof_DecorationSchema = new Schema({
        IDL:{
            type:Schema.Types.ObjectId,
            ref:"Line",

        },
        IDR:{
            type:Schema.Types.ObjectId,
            ref:"Roof",

        },
        Altitude1:{
            type: Number
        },
        Altitude2:{
            type: Number
        },
        Name:{
            type: String
        }
})

const Roof_Decoration = mongoose.model("Roof_Decoration",Roof_DecorationSchema,"Roof_Decoration")
module.exports = {Roof_Decoration}