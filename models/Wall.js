const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WallSchema = new Schema({
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

const Wall = mongoose.model("Wall",WallSchema,"Wall")
module.exports = {Wall}
