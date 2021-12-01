const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Column_DecorationSchema = new Schema({
        IDP:{
            type:Schema.Types.ObjectId,
            ref:"Polygon",
            required:true
        },
        IDC:{
            type:Schema.Types.ObjectId,
            ref:"Column",
            required:true
        },
        Name:{
            type: String
        }
})

module.exports = mongoose.model("Column_Decoration",Column_DecorationSchema)