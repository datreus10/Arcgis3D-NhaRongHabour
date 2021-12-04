const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PointSchema = new Schema({
      IDN:{
          type: Schema.Types.ObjectId,
          ref:"Node",

      },
      Name: {
          type: String
      }
})

const Point = mongoose.model("Point",PointSchema,"Point")
module.exports = {Point}