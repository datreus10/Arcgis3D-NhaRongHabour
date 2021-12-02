const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PolygonSchema = new Schema({
    IDN:{
        type:mongoose.Types.ObjectId,
        ref:"Node",
        required: True
    },
    IDB:{
        type:mongoose.Types.ObjectId,
        ref:"Body",
        required: True
    },
    Width:{
        type: Float
    },
    Length:{
        type: Float
    },
    Height:{
        type: Float
    },
    Altitude:{
        type: Float
    },
    Direction:{
        type: Int
    },
    Name:{
        type: String
    }

})
module.exports = mongoose.Model("Polygon",PolygonSchema)