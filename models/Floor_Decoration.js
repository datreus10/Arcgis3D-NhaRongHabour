const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Floor_DecorationSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",

  },
  IDFL:{
    type: Schema.Types.ObjectId,
    ref: "Floor",

  },
  Name: {
    type: String,
  }
});

const Floor_Decoration = mongoose.model("Floor_Decoration",Floor_DecorationSchema,"Floor_Decoration")
module.exports = {Floor_Decoration}