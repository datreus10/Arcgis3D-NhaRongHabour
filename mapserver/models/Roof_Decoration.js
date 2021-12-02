const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Roof_DecorationSchema = new Schema({
        IDL:{
            type:Schema.Types.ObjectId,
            ref:"Line",
            required:true
        },
        IDR:{
            type:Schema.Types.ObjectId,
            ref:"Roof",
            required:true
        },
        Altitude1:{
            type: Int
        },
        Altitude2:{
            type: Int
        },
        Name:{
            type: String
        }
})

module.exports = mongoose.model("Roof_Decoration",Roof_DecorationSchema)