const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PolygonSchema = new Schema({
    IDN:{
        type:mongoose.Types.ObjectId,
        ref:"Node",
    },
    IDB:{
        type:mongoose.Types.ObjectId,
        ref:"Body",
    },
    Width:{
        type: Number
    },
    Length:{
        type: Number
    },
    Height:{
        type: Number
    },
    Direction:{
        type: Number
    }
})
const Polygon = mongoose.model("Polygon",PolygonSchema,"Polygon")
module.exports = {Polygon}