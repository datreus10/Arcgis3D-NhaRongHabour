const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Roof_BrickSchema = new Schema({
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

const Roof_Brick = mongoose.model("Roof_Brick",Roof_BrickSchema,"Roof_Brick")
module.exports = {Roof_Brick}