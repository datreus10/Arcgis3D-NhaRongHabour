const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PointSchema = new Schema({
      IDN:{
          type: Schema.Types.ObjectId,
          ref:"Node",
          required: true
      },
      Name: {
          type: String
      }
})

module.exports = mongoose.model("Point",PointSchema)