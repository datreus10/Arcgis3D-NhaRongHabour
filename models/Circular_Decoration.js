const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Circular_DecorationSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
  },
  IDC: {
    type: Schema.Types.ObjectId,
    ref: "Column",
  },
  Count: {
    type: Number
  },
  Name: {
    type: String
  }
});

const Circular_Decoration = mongoose.model("Circular_Decoration",Circular_DecorationSchema,"Circular_Decoration")
module.exports = {Circular_Decoration}