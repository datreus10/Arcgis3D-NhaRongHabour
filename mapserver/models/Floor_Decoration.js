const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Floor_DecorationSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
    required: true,
  },
  IDFL:{
    type: Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
  Name: {
    type: String,
  }
});

module.exports = mongoose.model("Floor_Decoration", Floor_DecorationSchema);
