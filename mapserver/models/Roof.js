const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoofSchema = new Schema({
        IDP:{
            type:Schema.Types.ObjectId,
            ref:"Polygon",
        },
        IDW:{
            type:Schema.Types.ObjectId,
            ref:"Wall",
        },
        Name:{
            type: String
        }
})

const Roof = mongoose.model("Roof",RoofSchema,"Roof")
module.exports = {Roof}