const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Floor_BrickSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",

  },
  IDFL: {
    type: Schema.Types.ObjectId,
    ref: "Floor",

  },
  Name: {
    type: String,
  }
});

const Floor_Brick = mongoose.model("Floor_Brick",Floor_BrickSchema,"Floor_Brick")
module.exports = {Floor_Brick}