const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepsSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
  },
  IDFL: {
    type: Schema.Types.ObjectId,
    ref: "Floor",
  },
  Name:{
      type:String
  }
});

const Steps = mongoose.model("Steps",StepsSchema,"Steps")
module.exports = {Steps}